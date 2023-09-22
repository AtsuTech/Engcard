import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CreateCard } from "./CreateCard";
import { UpdateCardLink } from "./UpdateCardLink";
import { DeleteCard } from "./DeleteCard";

export const CardList:FC<{id: any}> = ({id}) => {

    const [cards,setCards] = useState<any>([]);
    //const [part_of_speeches,setPart_of_speeches] = useState<any>([]);
    
    const [update,setUpdate] = useState(false);
    function Update(){
        
        if(update){
            setUpdate(false);
        }else if(!update){
            setUpdate(true);
        }
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

                <div key={card.id} className="flex border border-gray-300 mb-3 p-3 rounded">
                    <div className="w-full border-r border-gray-300 text-2xl">{card.word}</div>
                    <div className="flex w-full">
                        <div className="mr-0 bg-gray-400 w-18 h-8 ml-1 mr-1 p-1 text-white rounded-lg font-medium text-1xl">{card.part_of_speech}</div>
                        <div className="text-2xl">{card.word_mean}</div>
                    </div>
                    <UpdateCardLink id={card.id_encrypt} />
                </div>

            ))}
            <CreateCard id={id} Update={Update} />
        </>
    );
}