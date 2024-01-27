import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { NextSlideButton } from "./parts_component/NextSlideButton";
import { PrevSlideButton } from "./parts_component/PrevSlideButon";
import { CloseButton } from "./parts_component/CloseButton";

const FinishMemory = () => {
    const { flashcard_id } = useParams();
    const navigate = useNavigate();
    const url:string = `/flashcard/${flashcard_id}`;
    
    const handleFinishMemory = () => {
        navigate(url);
    }

    return (
        <CloseButton onClick={handleFinishMemory} />
    );
}

export const Memory:FC =()=>{

    const { flashcard_id } = useParams();


    interface flashcard{
        id:any,
        title:any,
        created_at:any,
        updated_at:any,
        user_name:any,
        user_id:any,
    }

    const [flashcard,setFlashcard] = useState<flashcard>({
        id:'',
        title:'',
        created_at:'',
        updated_at:'',
        user_name:'',
        user_id:'',
    });

    document.title = "暗記:"+flashcard.title;

    const [cards,setCards] = useState([]);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 

            setFlashcard({
                id:response.data.id,
                title:response.data.title,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
                user_name:response.data.user.name,
                user_id:response.data.user.id,
            });

            setCards(response.data.cards);

        }).catch((error) => { 
            console.log(error);
            //setNotFonund(true);
        });
    },[]);


    const [turn,setTurn] = useState<number>(0);
    const [change,setChange] = useState(false);

    //カードをインデックス番号で1件フィルタ
    const selected_card:any = cards.filter((_:any,index:any) => index == turn);

    const Back =()=>{
        if(turn > 0){
            setChange(false);
            setTurn(turn - 1);
        }
    }

    const Next =()=>{
        if(turn < (cards.length - 1)){
            setChange(false);
            setTurn(turn + 1);
        }
    }

    const Change =()=>{
        if(change == false){
            setChange(true);
        }else if(change == true){
            setChange(false);
        }
    }



    return(
        <>
            
            <header className="flex w-full h-12 border border-b-gray-300">
                <h1 className="w-full py-2">{flashcard.title}</h1>
                <div className="w-18">
                    <FinishMemory />
                </div>
            </header>

            <div className="text-center">
                {turn + 1}/{cards.length}
            </div>

            <div className="flex w-full">

                <div className="flex items-center justify-center w-20 h-96">
                    <div>
                        {turn > 0 && <PrevSlideButton onClick={Back}/>}
                    </div>
                </div>
                
                <div className="w-full mt-3">
                    {selected_card.map( (card:any,index:number) => (

                        <div key={index} className="flex flex-col items-center justify-center h-screen">
                            
                            <div>
                                {change ?
                                    <div className="text-6xl ">
                                        {card.word_mean}
                                    </div>
                                :
                                    <div className="text-6xl">
                                        {card.word}
                                    </div>
                                }
      
                            </div>

                        </div>                          
                        
                    ))}
                    <button className="fixed bottom-20 transform -translate-x-1/2 left-1/2 border border-gray-400 hover:bg-amber-300 text-gray-500 font-bold py-2 px-4 rounded-full w-1/2" onClick={Change}>
                    めくる
                    </button>

                </div>

                <div className="flex items-center justify-center w-20 h-96">
                    <div>
                        {turn < (cards.length - 1) && <NextSlideButton onClick={Next} />}
                    </div>
                </div>
            </div>

        </>
    );
}