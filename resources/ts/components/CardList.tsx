import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CreateCard } from "./CreateCard";

export const CardList:FC<{id: any}> = ({id}) => {

    const [cards,setCards] = useState<any>([]);
    const [update,setUpdate] = useState(false);
    function Update(){
        setUpdate(true);
    }

    //DBより編集対象データ取得し値をセット
    useEffect(()=>{
        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + id).then((response) => { 
            console.log(response);
            setCards(response.data.cards);
            
            
        }).catch((error) => { 
            
        });
    },[update]);

    return(
        <>
            {cards.map( (card:any) => (

                <div key={card.id} className="flex border border-gray-300 mb-3 p-3 text-2xl rounded">
                    <div className="w-full border-r border-gray-300 ">{card.word}</div>
                    <div className="w-full"><span>{card.part_of_speech}</span>{card.word_mean}</div>
                </div>

            ))}
            <CreateCard id={id} Update={setUpdate} />
        </>
    );
}