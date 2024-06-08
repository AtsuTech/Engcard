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


                // <div key={card.id} className="flex ">
                //     <div className="flex w-full h-fit border border-gray-300 mb-3 p-3 rounded-lg">
                //         <div className="w-full border-r border-gray-300 /text-2xl">{card.word}</div>
                //         <div className="flex w-full">
                //             {/* <div className="mr-0 bg-gray-400 w-18 h-8 ml-1 mr-1 p-1 text-white rounded-lg font-medium text-1xl">{card.category}</div> */}
                //             <span className="block w-fit h-fit bg-gray-400 px-2 text-center text-white text-sm rounded">{card.category}</span>
                //             <div className="text-sm">{card.word_mean}</div>
                //         </div>
                //     </div>

                //     <div className="flex items-center justify-center /border-2 h-12 ml-2 border-amber-400 rounded-lg">
                //         {/* <UpdateCardLink id={card.uuid} /> */}
                //         <OperateCardMenu id={card.id} uuid={card.uuid}  />
                //     </div>

                // </div>
                

            ))}
            <CreateCard id={id} Update={Update} />
        </>
    );
}