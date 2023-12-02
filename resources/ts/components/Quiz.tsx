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

    const [cards,setCards] = useState<any>([]);
    const [turn,setTurn] = useState<number>(0);
    const [change,setChange] = useState(false);
    const [selected_answer,setSelectedAnswer] = useState('');
    //var getID:any;




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





    // if(selected_card.length != 0 ){
    //     getID = selected_card[0].id;
    // }


    const [choices,setChoices] = useState([]);

    useEffect(()=>{


        axios.get(`/api/card/quiz/get/${flashcard_id}/${turn}`).then((response) => { 
            setChoices(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    },[turn]);


    //カードのデータをindex番号でフィルタする
    const selected_card:any = cards.filter((_:any,index:any) => index == turn);

    //戻る
    const Back =()=>{
        if(turn > 0){
            setChange(false);
            setTurn(turn - 1);
        }
        setSelectedAnswer('');
    }

    //進む
    const Next =()=>{
        if(turn < (cards.length - 1)){
            setChange(false);
            setTurn(turn + 1);
        }
        setSelectedAnswer('');
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
        //alert('正解');
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
        //alert('残念。不正解');
    }

    const CorrectAnswer:FC<{choice:any,selected_answer:any,action:any}> =({choice,selected_answer,action})=>{
        return(
            <li className="flex block relative w-full h-12 my-2 bg-gray-100 rounded-full">
                <input 
                    type="radio" 
                    id={choice} 
                    value={choice}
                    onChange={(e:any) => setSelectedAnswer(e.target.value)} 
                    checked={choice == selected_answer} 
                    className="sr-only peer" 
                />
                <label 
                    htmlFor={choice}
                    onClick={action}
                    className="block w-full h-12 py-3  bg-gray-200 rounded-full  text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-green-200"
                    >
                    {choice}
                </label>
                <div className="hidden absolute top-3 left-5 peer-checked:block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-2xl text-green-500 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </li>
        );
    }

    const InCorrectAnswer:FC<{choice:any,selected_answer:any,action:any}> =({choice,selected_answer,action})=>{
        return(
            <li className="flex block relative w-full h-12 my-2 bg-gray-100 rounded-full">
                <input 
                    type="radio" 
                    id={choice} 
                    value={choice}
                    onChange={(e:any) => setSelectedAnswer(e.target.value)} 
                    checked={choice == selected_answer} 
                    className="sr-only peer" 
                />
                <label 
                    htmlFor={choice}
                    onClick={action}
                    className="block w-full h-12 py-3  bg-gray-200 rounded-full  text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-red-200"
                    >
                    {choice}
                </label>
                <div className="hidden absolute top-3 left-5 peer-checked:block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-2xl text-red-500 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </li>
        );
    }


    return(
        <main>
            
            <header className="flex w-full h-12 border border-b-gray-300">
                <h1 className="w-full p-3 /text-center">クイズ:{flashcard.title}</h1>
                <Link to={`/flashcard/${flashcard_id}`} className="block w-12 mt-2 ">
                    <h5 className="">終了</h5>
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
                                <div className="flex w-full h-96 border border-gray-300 rounded text-6xl items-center justify-center" id="card_id" data-id={card.id}>
                                    {card.word}
                                    
                                </div>
                                <div>
                                    {choices.map( (choice:any,index:number) => (
                                        <ul key={choice}>
                                        {choice == card.word_mean?
                                            <CorrectAnswer choice={choice} selected_answer={selected_answer} action={Correct} />
                                            :
                                            <InCorrectAnswer choice={choice} selected_answer={selected_answer} action={Incorrect} />
                                        }
                                        </ul>
                                    ))}  
                                </div>
                            </div>
                        }
                        </>
                          
                    </div>
                  
                ))}
                
                <button onClick={Change}>答えをみる</button>
                {/* <h1>{getID}</h1> */}
                <div>{turn + 1}/{cards.length}</div>
                </div>

                <div className="w-24 h-96 bg-gray-100">
                    {turn < (cards.length - 1) && <button onClick={Next}>→</button>}
                </div>
                
            </div>

        </main>
    );
}