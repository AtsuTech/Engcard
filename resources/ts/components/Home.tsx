import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

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

            <div className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">

                {flashcards.length ==0 && <div className="h-96 text-2xl flex justify-center items-center">単語帳がありません</div>}

                <ul>
                    {flashcards.map( (flashcard:any) => (
                        <li key={flashcard.id} className="block w-full p-3 mb-2 border border-gray-300 rounded">
                            
                            <Link to={`/flashcard/${flashcard.id_encrypt}`} className="block w-full text-2xl">
                                詳細{flashcard.title}
                            </Link>
                            <small className="mr-2">{flashcard.updated_at}</small>
                            <small className="mr-2">投稿:{flashcard.user.name}</small>
                            <small>カード枚数:{flashcard.cards.length}</small>
                        </li>
                    ))}
                </ul>


            </div>
        </>

    )

}