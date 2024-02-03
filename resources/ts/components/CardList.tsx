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

                <div key={card.id} className="flex ">
                    <div className="flex w-full h-fit border border-gray-300 mb-3 p-3 rounded-lg">
                        <div className="w-full border-r border-gray-300 /text-2xl">{card.word}</div>
                        <div className="flex w-full">
                            {/* <div className="mr-0 bg-gray-400 w-18 h-8 ml-1 mr-1 p-1 text-white rounded-lg font-medium text-1xl">{card.category}</div> */}
                            <span className="block w-fit h-fit bg-gray-400 px-2 text-center text-white text-sm rounded">{card.category}</span>
                            <div className="text-sm">{card.word_mean}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center /border-2 h-12 ml-2 border-amber-400 rounded-lg">
                        <UpdateCardLink id={card.uuid} />
                        <button className="flex items-center justify-center bg-gray-400 w-10 h-10 text-white rounded-lg ml-1 /font-medium /text-1xl">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                </div>
                

            ))}
            <CreateCard id={id} Update={Update} />
        </>
    );
}