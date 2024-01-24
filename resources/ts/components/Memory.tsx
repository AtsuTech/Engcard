import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NextSlideButton } from "./parts_component/NextSlideButton";
import { PrevSlideButton } from "./parts_component/PrevSlideButon";


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
                <h1 className="text-center">暗記</h1>
                <Link to={`/flashcard/${flashcard_id}`} className="block w-full mt-2">
                    <h5 className="text-3xl">終了</h5>
                </Link>
            </header>

            <div className="flex w-full">

                <div className="flex items-center justify-center h-96">
                    <div>
                        {turn > 0 && <PrevSlideButton onClick={Back}/>}
                    </div>
                </div>
                
                <div className="w-full mt-3">
                {cards.map( (card:any,index:number) => (

                    <div key={index} className="w-full">
                        {turn == index && 
                            <>
                            {change ?
                                <div className="flex w-full h-96 border border-gray-300 rounded text-6xl items-center justify-center">
                                    {card.word_mean}
                                </div>
                            :
                                <div className="flex w-full h-96 border border-gray-300 rounded text-6xl items-center justify-center">
                                    {card.word}
                                </div>
                            }
                            </>
                        }    
                    </div>
                    
                ))}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32" onClick={Change}>
                    めくる
                    </button>
                </div>

                <div className="flex items-center justify-center h-96">
                    <div>
                        {turn < (cards.length - 1) && <NextSlideButton onClick={Next} />}
                    </div>
                </div>
            </div>

        </>
    );
}