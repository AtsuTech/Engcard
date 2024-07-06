import { FC,useRef } from "react";
import { UserList } from "./UserList";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Title } from "./parts_component/Title";
import { PageBack } from "./parts_component/PageBack";


export const FollowedUser:FC = () =>{

    document.title = "フォロワー";

    const { user_id } = useParams();

    const [user,setUser] = useState<any>();
    const [flashcards,setFlashcards] = useState<any>();
    const [update,setUpdate] = useState<boolean>(false);


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
    },[]);


    return(
        <div className="w-full p-5 rounded-3xl bg-white text-slate-600">

            {user &&
                
                <>
                    <div className="flex items-center">
                        <PageBack />
                        <div className="ml-2">
                            <Title title="フォロワー" />
                        </div>
                    </div>

                    <div className="flex items-center w-fit /bg-rose-500">
                        <div className="py-2">
                            {user.profile_icon_img ?
                                <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + user.profile_icon_img} className="w-4 block rounded-full" />
                            :
                                <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png" } className="w-4 block rounded-full" />
                            }                           
                        </div>
                        <div className="pl-0.5 py-2 truncate">{user.name}さんのフォロワー</div>
                    </div>               

                    <p className="text-center py-2">全 {user.followed.length} 人</p>
                    {user.followed.map( (user:any) => (
                        
                        <UserList img={user.profile_icon_img} name={user.name} id={user.personal_id} />     
                                    
                    ))}   
                </>

            }
            
        </div>
    );
}