import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect,useRef} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BageDark } from "./parts_component/BageDark";
import { PageBack } from "./parts_component/PageBack";
import { FlashcardBreadcrumbs } from "./FlashcardBreadcrumbs";
import { FlashcardFavorite } from "./FlashcardFavorite";
import { CardList } from "./CardList";

export const FlashCard:FC = () =>{

    

    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    //const[notFonund,setNotFonund] = useState(false);
    //var Id = 0;

    


    interface flashcard{
        id:any,
        title:any,
        description:any,
        created_at:any,
        updated_at:any,
        user_name:any,
        user_id:any,
        personal_id:string,
        profile_icon_img:any,
    }

    const [flashcard,setFlashcard] = useState<flashcard>({
        id:'',
        title:'',
        description:'',
        created_at:'',
        updated_at:'',
        user_name:'',
        user_id:'',
        personal_id:'',
        profile_icon_img:'',
    });

    document.title = "単語帳:"+flashcard.title;

    const [cards,setCards] = useState([]);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 

            //console.log(response.data);
            // Id = 1;
            
            setFlashcard({
                id:response.data.id,
                title:response.data.title,
                description:response.data.description,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
                user_name:response.data.user.name,
                user_id:response.data.user.id,
                personal_id:response.data.user.personal_id,
                profile_icon_img:response.data.user.profile_icon_img,
            });

            

            setCards(response.data.cards);
            console.log(response.data.cards);

        }).catch((error) => { 
            console.log(error);
            //setNotFonund(true);
        });
    },[]);


    //console.log(typeof flashcard.id)
    const id = Number(flashcard.id);

    return(
        <>         
            <div>
                               
                <div className="w-full h-fit /border /border-gray-300 rounded-lg p-3 bg-white">

                    <div className="flex">
                        <div className="mr-3">
                            <PageBack />
                        </div>
                        <FlashcardBreadcrumbs current={flashcard.title} user={flashcard.user_id} />
                    </div>

                    <div className="relative h-10 px-2 text-xs">
                        <div className="absolute flex right-2 mt-1">

                            <div className="w-32 py-2 text-center /bg-blue-500 text-xs">
                                編集:{flashcard.created_at}
                            </div>
                            <Link to={`/profile/${flashcard.personal_id}`}>
                                <div className="flex w-fit /bg-rose-500">
                                    
                                    <div className="py-2">
                                        {/* <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + flashcard.profile_icon_img} 
                                            className="block w-4 rounded-full border border-gray-400" 
                                        />  */}
                                        {flashcard.profile_icon_img ?
                                            <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + flashcard.profile_icon_img} className="w-4 block rounded-full" />
                                        :
                                            <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png" } className="w-4 block rounded-full" />
                                        }                                    
                                    </div>
                                    
                                    <div className="pl-0.5 py-2 truncate">{flashcard.user_name}</div>
                                    
                                </div>    
                            </Link>                    
                        </div>
                    </div>

                    <div className="w-full h-fit border-2 border-yellow-400 mb-5 rounded-lg">

                        <div className="relative flex w-full h-10 pl-2 pt-1 bg-yellow-400 text-sm">

                            <div className="flex w-20 h-6 mt-1 text-xs items-center justify-center rounded-full bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                単語帳
                            </div>

                            <div className="absolute top-1.5 right-2">
                                <FlashcardFavorite id={flashcard_id} />
                            </div>

                        </div>

                        <div className="p-2">
                            {/* <h5 className="text-2xl h-fit /mb-2 text-wrap bg-purple-600">{flashcard.title}</h5> */}
                            <h5 className="text-2xl h-fit text-wrap break-all">
                                {flashcard.title}
                            </h5>                            
                        </div>


                    </div>


                    {flashcard.description &&
                        <div className="w-full  p-2 text-xs border bg-gray-200 rounded-lg">
                            <div className="text-sm font-bold">概要</div>
                            {flashcard.description}
                        </div>
                    }

                    

                    <div className="flex mt-5">

                        <button className="w-full h-fit mr-1 p-4 bg-yellow-400 rounded-full">
                            <Link to={`/read/${flashcard_id}`} className="block w-full h-fit">
                            読む
                            </Link>
                        </button>
                        
                        <button className="w-full h-fit mr-1 p-4 bg-yellow-400 rounded-full">
                            <Link to={`/memory/${flashcard_id}`} className="block w-full h-fit">
                            暗記
                            </Link>
                        </button>
                        
                        {cards.length > 10 ?
                            <button className="w-full h-fit ml-1 p-4 bg-yellow-400 rounded-full">
                                <Link to={`/quiz/${flashcard_id}`} className="block w-full h-fit">
                                クイズ
                                </Link>
                            </button>
                        :
                            <button className="w-full h-fit ml-1 p-4 bg-gray-300 rounded-full">
                                <div>クイズ</div>
                            </button>
                        }

                        

                    </div>
                    {cards.length < 10 && <p className="text-xs text-center py-3">10枚以上カードを作るとクイズを利用できます</p> }



                    <div className="flex py-3 mt-5 mb-5 items-center justify-center /text-center text-1xl border-b-2 border-b-yellow-400">
                        <div className="/bg-green-300">単語カード</div>
                        <div className="flex w-fit px-2 py-1 text-xs rounded-full bg-gray-200">{cards.length}</div>
                        {/* <div className="text-center text-xs mt-1">リストをクリックすると詳細な情報を見ることができます</div> */}
                    </div>
                    
                    {cards.length == 0 && 
                        <div className="flex items-center justify-center h-96">
                            <div>カードがありません</div>
                        </div>
                    }

                    {cards.map( (card:any) => (
                        <CardList 
                            id ={card.id}
                            uuid ={card.uuid}
                            memory ={card.memory}
                            word ={card.word}
                            word_mean ={card.word_mean}
                            category ={card.category}
                            sub_word_mean={card.wordmeans}
                            sentence={card.sentence}
                            sentence_mean={card.sentence_mean}
                            link={card.link}
                            user_id ={card.user_id}
                            flashcard_id ={card.flashcard_id}
                            img_path ={card.img_path}
                        /> 

                    ))}

                </div>
            </div>
                
            

        </>
    );
}