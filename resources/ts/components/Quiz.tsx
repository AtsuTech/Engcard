import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


export const Quiz:FC =()=>{

    const { flashcard_id } = useParams();


    interface flashcard{
        id:any,
        title:any,
    }

    const [flashcard,setFlashcard] = useState<flashcard>({
        id:'',
        title:'',

    });

    document.title = "クイズ:"+flashcard.title;

    const [cards,setCards] = useState([]);
    const [turn,setTurn] = useState<number>(0);
    const [change,setChange] = useState(false);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 

            setFlashcard({
                id:response.data.id,
                title:response.data.title,

            });

            setCards(response.data.cards);

        }).catch((error) => { 
            console.log('通信エラーが発生しました');
        });
    },[turn]);


    const [choices,setChoices] = useState([]);

    useEffect(()=>{


        axios.get(`/api/card/quiz/get/${flashcard_id}/${turn}`).then((response) => { 

            setChoices(response.data);

        }).catch((error) => { 
            console.log(error);
        });
    },[turn]);


    //カードのデータをindex番号でフィルタする
    const selected_card:any = cards.filter((_,index) => index == turn);


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

    const Correct =()=>{

        const params = {
            flashcard_id:flashcard_id,
            card_index:turn,
        }

        axios.post('/api/card/quiz/memory/true',params).then((response) => { 

        }).catch((error) => { 
            console.log(error);
        });
        alert('正解');
    }

    const Incorrect =()=>{

        const params = {
            flashcard_id:flashcard_id,
            card_index:turn,
        }

        axios.post('/api/card/quiz/memory/false',params).then((response) => { 

        }).catch((error) => { 
            console.log(error);
        });
        alert('残念。不正解');
    }


    return(
        <>
            
            <header className="flex w-full h-12 border border-b-gray-300">
                <h1 className="text-center">クイズ</h1>
                <Link to={`/flashcard/${flashcard_id}`} className="block w-full mt-2">
                    <h5 className="text-3xl">終了</h5>
                </Link>
            </header>

            <div className="flex w-full">

                <div className="w-24 h-96 bg-gray-100">
                    {turn > 0 && <button onClick={Back}>←</button>}
                </div>
                
                <div className="w-full mt-3">
                
                {selected_card.map((card:any) => (
                    <div key={card.word} className="w-full">
                         
                            <>
                            {change ?
                                <div>
                                    <h5>正解</h5>
                                    <div className="flex w-full h-96 border border-gray-300 rounded text-6xl items-center justify-center">
                                        {card.word_mean}
                                    </div>
                                </div>

                            :
                                <div>
                                    <div className="flex w-full h-96 border border-gray-300 rounded text-6xl items-center justify-center">
                                        {card.word}
                                       
                                    </div>
                                    <div>
                                        {choices.map( (choice:any,index:number) => (
                                            <>
                                            {choice == card.word_mean?
                                                <button className="w-full h-12 bg-gray-200 rounded mb-1"
                                                    onClick={Correct}>
                                                    {choice}
                                                </button>
                                                :
                                                <button className="w-full h-12 bg-gray-200 rounded mb-1"
                                                    onClick={Incorrect}>
                                                    {choice}
                                                </button>
                                            }
                                            </>
                                        ))}  
                                    </div>
                                </div>
                            }
                            </>
                          
                    </div>
                  
                ))}
                
                <button onClick={Change}>答えをみる</button>
                {}
                </div>

                <div className="w-24 h-96 bg-gray-100">
                    {turn < (cards.length - 1) && <button onClick={Next}>→</button>}
                </div>
                
            </div>

        </>
    );
}