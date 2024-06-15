import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { CreateCard } from "./CreateCard";
import { UpdateCardLink } from "./UpdateCardLink";
import { DeleteCard } from "./DeleteCard";
import { CardList } from "./CardList";
import { OperateCardMenu } from "./OperateCardMenu";

export const UpdateCardList:FC<{id: any}> = ({id}) => {

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
                <div className="flex">
                    <CardList 
                        id ={card.id}
                        uuid ={card.uuid}
                        memory ={card.memory}
                        word ={card.word}
                        word_mean ={card.word_mean}
                        category ={card.category}
                        user_id ={card.user_id}
                        flashcard_id ={card.flashcard_id}
                        img_path ={card.img_path}
                    />   
                    <div className="ml-1">
                       <OperateCardMenu id={card.id} uuid={card.uuid}  />
                    </div>          
                </div>

            ))}
            <CreateCard id={id} Update={Update} />
        </>
    );
}