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
        <div className="h-screen text-gray-500 /bg-blue-400">
            
            <header className="sticky top-0 w-full h-12 border-b border-b-gray-300 z-50">

                <div className="flex w-full">
                    <h1 className="w-40 p-3 /text-amber-400 font-bold /text-center">暗記</h1>

                    <div className="w-full p-3">
                        <div className="w-fit ml-auto mr-auto">
                            {turn + 1} / {cards.length}      
                        </div>
                    </div>

                    <div className="w-40 relative">
                        <div className="absolute inset-y-0 right-1 flex my-2 ">
                        <FinishMemory />
                        </div>
                    </div>
                </div>

                <div className="ml-3">
                    単語帳:{flashcard.title}
                </div>

            </header>


            <div className="absolute inset-0 flex items-center justify-center w-full">

                <div className="flex items-center justify-center w-20 /bg-pink-600 h-full">
                    <div>
                        {turn > 0 && <PrevSlideButton onClick={Back}/>}
                    </div>
                </div>
                
                <div className="flex items-center justify-center w-full /bg-green-600 h-full">
                    {selected_card.map( (card:any,index:number) => (

                        <div key={index} className="/flex /flex-col /items-center /justify-center /h-screen">
                            
                            <div>
                                {change ?
                                    <div className="text-4xl md:text-6xl text-center">
                                        {card.word_mean}
                                    </div>
                                :
                                    <div className="text-4xl md:text-6xl text-center">
                                        {card.word}
                                    </div>
                                }
      
                            </div>

                        </div>                          
                        
                    ))}


                    {change ?
                        <button className="fixed bottom-20 transform -translate-x-1/2 left-1/2 /border bg-gray-400 /border-gray-400 text-white font-bold py-2 px-4 rounded-full w-1/2" onClick={Change}>
                            単語に戻る
                        </button>
                    :
                        <button className="fixed bottom-20 transform -translate-x-1/2 left-1/2 /border bg-amber-400 /border-gray-400 text-white font-bold py-2 px-4 rounded-full w-1/2" onClick={Change}>
                            意味を見る
                        </button>
                    }

                </div>

                <div className="flex items-center justify-center w-20 /bg-pink-600 h-full">
                    <div>
                        {turn < (cards.length - 1) && <NextSlideButton onClick={Next} />}
                    </div>
                </div>

            </div>

        </div>
    );
}