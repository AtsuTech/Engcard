import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


export const Quiz:FC =()=>{

    const { flashcard_id } = useParams();

    const user_id = localStorage.getItem('user_id');

    interface flashcard{
        id:string|number,
        user_id:string|number,
        title:string,
    }

    const [flashcard,setFlashcard] = useState<flashcard>({
        id:'',
        user_id:'',
        title:'',
    });
    const [cards,setCards] = useState<any>([]);
    const [turn,setTurn] = useState<number>(0);
    const [mode,setMode] = useState(0);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 

            setFlashcard({
                id:response.data.id,
                user_id:response.data.user_id,
                title:response.data.title,
            });

            setCards(response.data.cards);

        }).catch((error) => { 
            console.log('通信エラーが発生しました');
        });
    },[turn]);



    document.title = "クイズ:"+flashcard.title;

    const [change,setChange] = useState(false);
    const [selected_answer,setSelectedAnswer] = useState('');//クリックした選択肢の値を管理
    const [view_card,setViewCard] = useState<number>();


    let random_index:any =[];
    for (let num = 0; num < cards.length; num++) {
        random_index.push(num);
    }
    
    const [random_turn,setRandomTurn] = useState<any>([]);

    const SetShuffle =()=>{

        for(var i=0;i<cards.length;i++) {

            let index = Math.floor(Math.random()*random_index.length);

            random_turn.push(random_index[index]);

            //添字の要素を配列から削除　
            random_index.splice(index,1);
            
        } 
        Shuffle();
    }

    const SetOrder =()=>{
        for(var i=0;i<cards.length;i++) {

            random_turn.push(random_index[i]);

        } 
        Shuffle();
    }

    console.log(view_card);
    

    //選択肢を取得
    const [choices,setChoices] = useState([]);
    useEffect(()=>{
        axios.get(`/api/card/quiz/get/${flashcard_id}/${view_card}`).then((response) => { 
            setChoices(response.data);
            console.log(choices);
        }).catch((error) => { 
            console.log(error);
        });
    },[turn]);



    //カードのデータをindex番号でフィルタする
    const selected_card:any = cards.filter((_:any,index:any) => index == view_card);



    //シャッフルして進む
    const Shuffle =()=>{
        setTurn(turn + 1);
        setViewCard(random_turn[turn]);
        setSelectedAnswer('');
    }


    const Change =()=>{
        if(change == false){
            setChange(true);
        }else if(change == true){
            setChange(false);
        }
    }

    //正解
    const Correct =()=>{

        const params = {
            flashcard_id:flashcard_id,
            card_index:view_card,
        }

        
        if(user_id == flashcard.user_id){
            axios.post('/api/card/quiz/memory/true',params).then((response) => { 
            
            }).catch((error) => { 
                console.log(error);
            });
        }



        setTimeout(() => {
            Shuffle();
        }, 500);
    }

    //不正解
    const Incorrect =()=>{

        const params = {
            flashcard_id:flashcard_id,
            card_index:view_card,
        }

        if(user_id == flashcard.user_id){
            axios.post('/api/card/quiz/memory/false',params).then((response) => { 
                
            }).catch((error) => { 
                console.log(error);
            });
        }

        setTimeout(() => {
            Shuffle();
        }, 500);
    }

    const CorrectAnswer:FC<{choice:any,selected_answer:any,action:any}> =({choice,selected_answer,action})=>{
        return(
            <li className="flex relative w-full h-12 my-2 bg-gray-100 rounded-full">
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
            <li className="flex relative w-full h-12 my-2 bg-gray-100 rounded-full">
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
                <h1 className="w-full p-3 /text-center">クイズ(s):{flashcard.title}</h1>
                <select name="" id="" className="bg-gray-200 focus:outline-none cursor-pointer" onChange={(e:any) => setMode(e.target.value)}>
                    <option value={0}>カード順</option>
                    <option value={1}>ランダム</option>
                </select>
                <Link to={`/flashcard/${flashcard_id}`} className="block w-12 mt-2 ">
                    <h5 className="">終了</h5>
                </Link>
            </header>

            <div className="flex w-full">
                
                <div className="w-full mt-3">
                    <b>{user_id}</b>
                    


                
                {random_turn.length == 0 &&
                    <>
                    {mode == 0 &&
                        // <button className="w-full h-12 bg-cyan-300" onClick={SetOrder}>
                        //     開始
                        // </button>
  
                        <div className="flex items-stretch justify-center h-screen">
                            
                                <button className="w-96 h-12 bg-cyan-300" onClick={SetOrder}>スタート!</button>
                            
                        </div>
                    }
                    </>
                }

                {random_turn.length == 0 &&
                    <>
                    {mode == 1 &&
                        <button className="w-full h-12 bg-cyan-300" onClick={SetShuffle}>
                            開始
                        </button>
                    }
                    </>
                }

                
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
                                        <ul key={index}>
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
                <div>{turn}/{cards.length}</div>
                <b className="text-red-500">{view_card}</b>
                </div>
                
            </div>

        </main>
    );
}