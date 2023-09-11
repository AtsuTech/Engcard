import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';

export const FlashCard:FC = () =>{

    

    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    const[notFonund,setNotFonund] = useState(false);

    const [flashcard,setFlashcard] = useState({
        title:'',
        created_at:'',
        updated_at:'',
        user_name:'',
    });

    document.title = "単語帳:"+flashcard.title;

    const [cards,setCards] = useState([]);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 
            console.log(response);
            setFlashcard({
                title:response.data.title,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
                user_name:response.data.user.name,
            });

            setCards(response.data.cards);

        }).catch((error) => { 
            console.log(error);
            setNotFonund(true);
        });
    },[]);

    return(
        <>
            
            {notFonund ?
                
                <div>ページが見つかりません</div>

                :
                
                <div>
                    {/* <h1 className="text-3xl">単語帳詳細</h1> */}
                    <div className="text-3xl">{flashcard.title}</div>
                    <div>
                        <small>投稿:{flashcard.user_name}</small>
                    </div>
                    
                    <small>{flashcard.created_at}</small>

                    {cards.map( (card:any) => (

                        <div key={card.id} className="flex border border-gray-300 mb-3 p-3 text-2xl rounded">
                            <div className="w-full border-r border-gray-300 ">{card.word}</div>
                            <div className="w-full">{card.word_mean}</div>
                        </div>

                    ))}

                </div>

                
            }

        </>
    );
}