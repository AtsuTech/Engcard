import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect,useRef} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BageDark } from "./parts_component/BageDark";
import { FlashcardFavorite } from "./FlashcardFavorite";

export const FlashCard:FC = () =>{

    

    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    //const[notFonund,setNotFonund] = useState(false);
    var Id = 0;

    


    interface flashcard{
        id:any,
        title:any,
        created_at:any,
        updated_at:any,
        user_name:any,
    }

    const [flashcard,setFlashcard] = useState<flashcard>({
        id:'',
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

            //console.log(response.data);
            // Id = 1;
            
            setFlashcard({
                id:response.data.id,
                title:response.data.title,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
                user_name:response.data.user.name,
            });

            

            setCards(response.data.cards);

        }).catch((error) => { 
            console.log(error);
            //setNotFonund(true);
        });
    },[]);


    //console.log(typeof flashcard.id)
    const id = Number(flashcard.id);

    return(
        <>
            {cards.length == 0 && <div>ページが見つかりません</div>}
         
            <div>
               
                <div>単語帳:{flashcard.title}</div>
                
                <div className="w-full h-fit border border-gray-300 rounded-lg p-3 bg-white">
                    
                    <div className="text-right">
                        <small>投稿:{flashcard.user_name}</small>
                        <small className="ml-2">{flashcard.created_at}</small>
                    </div>

                    <FlashcardFavorite id={flashcard_id} />
                    {/* <FlashcardFavorite id={1} /> */}

                    <div className="w-full h-fit p-3 bg-yellow-400 text-white text-3xl mt-2 mb-5 rounded-l-lg">
                        {flashcard.title}
                    </div>

                    <div className="py-3">カード数:{cards.length}枚</div>

                    {cards.map( (card:any) => (
                        <Link to={`/card/${card.id_encrypt}`} key={card.id}>
                            <div key={card.id} className="flex border bg-white border-gray-300 mb-3 p-3 text-2xl rounded">
                                
                                <div className="w-full border-r border-gray-300 ">{card.word}</div>
                                    
                                <div className="w-full flex">

                                    <div className="mt-0.5 ml-2">
                                        <BageDark value={card.category} />
                                    </div>
                                    
                                    <div className="ml-2">
                                        {card.word_mean}
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
                
            

        </>
    );
}