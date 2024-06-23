import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { Following } from "./Following";
import { PageBack } from "./parts_component/PageBack";
import { Title } from "./parts_component/Title";
//import { FollowingUser } from "./FollowingUser";
import { FollowingUser } from "./FollowingUser";
import { FollowedUser } from "./FollowedUser";
import { FlashcardList } from "./FlashcardList";


export const Profile:FC =()=>{

    document.title = "プロフィール";

    const { user_id } = useParams();
    const [user,setUser] = useState<any>();
    const [flashcards,setFlashcards] = useState<any>();
    const [update,setUpdate] = useState<boolean>(false);

    function Update (){
        if(update){
            setUpdate(false);
        }else if(!update){
            setUpdate(true);
        }
    }

    useEffect(()=>{

        const getUser = async () => {
            axios.get('/api/profile/' + user_id).then((response:any) => { 

                setUser(response.data);
                setFlashcards(response.data.flashcards);
                console.log(response.data);
    
            }).catch((error) => { 
                console.log('通信エラーが発生しました');
            });
        }

        getUser();
    },[update,user_id]);

    const my_id:any = localStorage.getItem('user_id');

    return(
        <>
            <div className="w-full p-5 rounded-3xl bg-white text-slate-600">

                <div className="flex items-center">
                    <PageBack />
                    <div className="ml-2">
                        <Title title="プロフィール" />
                    </div>
                </div>

                {user && (
                    <div className="w-full text-slate-600">

                        <div className="border m-0.5 p-2 border-gray-300 rounded-lg">
                            <div className="flex relative">

                                <div className="w-fit border border-slate-300 rounded-full">
                                    {user.profile_icon_img ?
                                        <img src={ '/storage/images/profile/' + user.profile_icon_img} className="w-12 block rounded-full" />
                                    :
                                        <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png" } className="block w-12 rounded-full ml-auto mr-auto" />
                                    }
                                </div>

                                      

                                <div className="pl-2">
                                    <div className="text-2xl">{user.name}</div>
                                    <div className="text-xs text-gray-400">@{user.personal_id}</div>
                                </div>

                                <div className="w-32 absolute right-0">

                                    {my_id != user.id &&
                                        <div>
                                            <Following id={user.id} update={Update} />
                                        </div>                                
                                    }
    
                                </div>

                            </div>

                            <div className="flex py-2">
                                <div className="p-1">
                                    <FollowingUser users={user.following} />
                                </div>
                                <div className="p-1">
                                    <FollowedUser users={user.followed} />
                                </div>
                            </div>
                        
                            <div className="py-1">{user.comment}</div>
                        </div>

                        <div className="py-2 text-center">単語帳</div>

                        <div className="flex flex-wrap /py-2">
                            {flashcards.map( (flashcard:any) => (
                                
                                <div key={flashcard.id} className="block w-full md:w-3/6 p-0.5">
                                    <FlashcardList
                                        id= ""
                                        uuid= {flashcard.uuid}
                                        title= {flashcard.title}
                                        description = {flashcard.description}
                                        date = {flashcard.updated_at}
                                        length = {flashcard.cardlength}
                                        favorite = {flashcard.favorite}
                                        user_id= ""
                                        user_name= {user.name}
                                        user_img = { user.profile_icon_img}
            
                                    />                         
                                </div>
                                
                            ))}                             
                        </div>
                       
                    </div>
                )}
            </div>
        </>
    );
}