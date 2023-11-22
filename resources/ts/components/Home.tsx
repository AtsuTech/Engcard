import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FlashcardFavorite } from "./FlashcardFavorite";

document.title = 'ホーム';

export const Home: FC = () => {

    const [flashcards,setFlashcards] = useState<any>([]);

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/flashcard/public').then((response) => { 
            console.log(response);
            setFlashcards(response.data);

        }).catch((error) => { 
            
        });
    },[]);



    return (
        <>
            <div>
                <h1>タイムライン</h1>
            </div>

            <div className="flex flex-wrap w-full /ml-auto /mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">

                {flashcards.length ==0 && <div className="w-full h-96 text-2xl flex justify-center items-center">単語帳がありません</div>}

                {flashcards.map( (flashcard:any) => (
                    
                    <div key={flashcard.id} className="block w-3/6 p-1">
                        <div className="border border-gray-300 p-2 rounded">
                        <Link to={`/flashcard/${flashcard.id_encrypt}`} className="block w-full text-2xl">
                            {flashcard.title}
                        </Link>
                        <div className="flex">
                            <small className="mr-2">{flashcard.updated_at}</small>
                            <div className="mr-2 flex">
                                <div className="pt-0.5">
                                    {flashcard.user.profile_icon_img != null && <img src={'/storage/images/profile/' + flashcard.user.profile_icon_img} width={17} height={17} alt="" className="block rounded-full mr-1" />}
                                    {flashcard.user.profile_icon_img == null && <img src={'/storage/images/profile/'} width={17} height={17} alt="" className="block rounded-full mr-1" />}
                                </div>
                                <small>{flashcard.user.name}</small>
                            </div>
                            <small>カード枚数:{flashcard.cards.length}</small>
                            {/* {typeof flashcard.id} */}
                            {/* <FlashcardFavorite id={flashcard.id} /> */}
                        </div>
                        </div>
                    </div>
                    
                ))}

            </div>
        </>

    )

}