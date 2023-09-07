import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

document.title = 'ホーム';

export const Home: FC = () => {

    const [myflashcards,setmyflashcards] = useState([]);

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/flashcard/public').then((response) => { 
            console.log(response);
            setmyflashcards(response.data);

        }).catch((error) => { 
            
        });
    },[]);

    return (
        <>
            <div>
                <h1>ホーム</h1>
                <div>トップページです。</div>
            </div>

            <div className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">
                {
                    myflashcards.map( (myflashcard:any) => (

                        <li key={myflashcard.id} className="block w-full h-30 mb-5 mt-5 pl-5 border border-blue-600 rounded">
                            <h5>{myflashcard.title}</h5>
                            <p>{myflashcard.updated_at}</p>
                            <p>投稿:{myflashcard.user.name}</p>
                            
                            <Link to={`/flashcard/${myflashcard.id_encrypt}`}>
                                詳細
                            </Link>
                        </li>
           
                    ))
                }
            </div>
        </>

    )

}