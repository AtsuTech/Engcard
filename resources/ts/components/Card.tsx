import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteCard } from "./DeleteCard";
import { BageDark } from "./parts_component/BageDark";

export const Card:FC = () => {

    //URLからパラメータを取得
    const { card_id } = useParams();

    const [card,setCards] = useState({
        card_id:'',
        word:'',
        word_mean:'',
        img_path:'',
        sentence:'',
        sentence_mean:'',
        memory:'',
        category:'',
        link:'',
        flashcard_id:'',
        flashcard_title:'',
        created_at:'',
    });

    const[message,setMassage] = useState('');

    document.title = '単語:'+card.word;

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/card/' + card_id).then((response) => { 
            console.log(response);
            
            setCards({
                card_id:response.data.id_encrypt,
                word : response.data.word,
                word_mean : response.data.word_mean,
                img_path : '/storage/images/' + response.data.img_path,
                sentence : response.data.sentence,
                sentence_mean : response.data.sentence_mean,
                memory : response.data.memory,
                category : response.data.category,
                link : response.data.link,
                flashcard_id : response.data.flashcard.id_encrypt,
                flashcard_title:response.data.flashcard.title,
                created_at: response.data.created_at,
            });

            setMassage(response.data.message);

            //console.log(card);

        }).catch((error) => { 
            console.log(error);
        
        });
    },[]);



    return(
        <>
            <h5>{message}</h5>
            <Link to={`/card/update/${card.card_id}`}>
                編集
            </Link>
            <DeleteCard id={card_id} flashcard_id={card.flashcard_id} />
            <h5>単語帳{card.flashcard_title}</h5>
            <p></p>

            <div className="w-96 h-fit ml-auto mr-auto border border-gray-300 rounded-lg">
                <div style={{ backgroundImage: `url(${card.img_path})` }} className="bg-gray-500 bg-cover bg-center w-full h-64 rounded-lg">
                </div>

                <h2 className="w-full h-40 flex justify-center items-center bg-white text-6xl">
                    {card.word}
                </h2>

                <div className="w-full h-fit bg-white">
                    <div className="w-full hit bg-yellow-400">意味</div>
                    <div className="flex text-3xl p-2">
                        <div className="mt-0.5">
                            <BageDark value={card.category}/>
                        </div>
                        <div className="ml-1 text-2xl">{card.word_mean}</div>
                    </div>
                </div>

                <div className="w-full h-fit bg-white">
                    <div className="w-full hit bg-yellow-400">例文</div>
                    <div className="p-2">
                        <div>{card.sentence}</div>
                        <div>{card.sentence_mean}</div>
                    </div>
                </div>

                {card.memory?
                <>暗記</>
                :
                <>暗記中</>
                }

                <button className="w-full h-fit border border-yellow-300 bg-white rounded-lg">
                    <a href={card.link} className="break-words /whitespace-pre-wrap /text-left">{card.link}</a>
                </button>
                
                <div>{card.created_at}</div>
            </div>
            
        </>
    );
}