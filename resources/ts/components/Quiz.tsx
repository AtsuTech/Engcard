import { FC } from "react";
import { useParams } from 'react-router-dom';
import { Link,useNavigate} from 'react-router-dom';
import { useState, useEffect} from "react";
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { CloseButton } from "./parts_component/CloseButton";
import { QuizResult } from "./QuizResult";


const FinishQuiz = () => {
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

    //正解数を数える
    const [count_correct,setCountCollect] = useState(0);


    let card_index:any =[];
    for (let num = 0; num < cards.length; num++) {
        card_index.push(num);
    }
    
    const [card_view_turn,setRandomTurn] = useState<any>([]);

    //
    const countCollect =()=>{
        setCountCollect(count_correct + 1);
    }

    //ランダムに出題
    const SetShuffle =()=>{

        for(var i=0;i<cards.length;i++) {

            let index = Math.floor(Math.random()*card_index.length);

            card_view_turn.push(card_index[index]);

            //添字の要素を配列から削除　
            card_index.splice(index,1);
            
        } 
        Shuffle();
    }

    //順番通りに出題
    const SetOrder =()=>{
        for(var i=0;i<cards.length;i++) {

            card_view_turn.push(card_index[i]);

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
        setViewCard(card_view_turn[turn]);
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

            //正解数をカウントする
            countCollect();
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
        <main className="h-screen text-gray-500">
            
            <header className="sticky top-0 flex w-full h-12 border border-b-gray-300 z-50">
                <h1 className="w-40 p-3 /text-center">クイズ</h1>

                <div className="w-full">
                    {turn > 0 &&
                        <div className="w-full p-3 text-center /bg-sky-400">{turn} / {cards.length}</div>
                    }

                    {turn == 0 &&
                        <div className="flex w-fit h-10 ml-auto mr-auto  my-0.5 /bg-green-700 border border-gray-300 px-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                            </svg>
                            <select name="" id="" className="block w-30 /h-10 px-2  /bg-amber-300 ml-auto mr-auto focus:outline-none cursor-pointer" onChange={(e:any) => setMode(e.target.value)}>
                                <option value={0}>カード順</option>
                                <option value={1}>ランダム</option>
                            </select>     
                        </div>
           
                    }                    
                </div>

                <div className="w-40 relative">
                    <div className="absolute inset-y-0 right-1 flex my-2 ">
                        <FinishQuiz /> 
                    </div>
                </div>
                
            </header>

            <div className="ml-1">
                単語帳:{flashcard.title}
            </div>

            <div className="/bg-green-400 absolute inset-0 flex items-center justify-center w-100 h-full">
                
                <div className="w-full px-2 /bg-slate-600">

                    <div className="w-fit ml-auto mr-auto">


                        {card_view_turn.length == 0 &&
                            <>
                            <p className="mb-2 text-center">
                                単語帳:{flashcard.title}<br/>
                                のクイズをスタートします。
                            </p>

                            {mode == 0 &&    
                                //カードを順番通りに出題
                                <button className="px-1 w-full md:px-0 md:w-96 h-12 rounded-full bg-amber-300 text-2xl" onClick={SetOrder}>
                                    Start!
                                </button>
                            }

                            {mode == 1 &&
                                //カードをランダムに出題
                                <button className="px-1 w-full md:px-0 md:w-96 h-12 rounded-full bg-amber-300 text-2xl" onClick={SetShuffle}>
                                    Start!
                                </button>
                            }
                            </>
                        }                        
                    </div>
                    
                    
                    {selected_card.map((card:any) => (
                        <div key={card.word} className="w-full">
                            
                            <>
                            {change ?
                                <div>
                                    <h5>正解</h5>
                                    <button onClick={Change}>もどる</button>
                                    <div className="flex w-full h-48 md:h-96 text-6xl items-center justify-center">
                                        {card.word_mean}
                                    </div>
                                </div>

                            :
                                <div>
                                    <button onClick={Change}>答えをみる</button>
                                    <div className="flex w-full h-48 md:h-96 /border /border-gray-300 /rounded text-6xl items-center justify-center" id="card_id" data-id={card.id}>
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
                            
                            <b className="text-red-500">{view_card}</b>
                        </div>
                    
                    ))}


                    {turn > cards.length &&
                        <div>
                            <div className="text-center text-2xl">クイズ結果</div>
                            <div className="text-center mt-2">
                                正解数:{count_correct} / {cards.length}問正解
                            </div>

                            <div className="ml-auto mr-auto">
                                <QuizResult total={cards.length} collect={count_correct} />
                            </div>


                        </div>
                    }

                </div>
                
            </div>

        </main>
    );
}