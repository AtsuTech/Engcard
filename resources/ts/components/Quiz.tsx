import { FC } from "react";
import { useParams } from 'react-router-dom';
import { Link,useNavigate} from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';
import { CloseButton } from "./parts_component/CloseButton";
import { QuizResult } from "./QuizResult";


//終了ボタンコンポーネント
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

    //URLより単語帳のuuidを取得
    const { flashcard_id } = useParams();

    //ユーザーの情報があれば取得。ログインユーザーとゲストユーザーでカードの暗記(momoryカラム)に変更を加えるかどうか処理を分けるため
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

    //APIでデータ取得
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


    //単語帳の情報を取得後にタイトルを操作
    document.title = "クイズ:"+flashcard.title;

    

    const [change,setChange] = useState(false);//答えを表示する切り替え判定のための変数
    const [selected_answer,setSelectedAnswer] = useState('');//クリックした選択肢の値を管理
    const [view_card,setViewCard] = useState<number>();//表示するカードを指定する変数

    //正解数を数える
    const [count_correct,setCountCollect] = useState(0);

    //カードのindex番号を管理する配列
    let card_index:any =[];
    //カードの総数でループさせてindex番号を配列に格納
    for (let num = 0; num < cards.length; num++) {
        card_index.push(num);
    }
    
    //カードの表示順番を管理する関数。表示の際はturn変数をキーとする。
    const [card_view_turn,setRandomTurn] = useState<any>([]);

    //正解数をカウントする関数
    const countCollect =()=>{
        setCountCollect(count_correct + 1);
    }

    //ランダムに出題
    const SetShuffle =()=>{

        for(var i=0;i<cards.length;i++) {

            //----カードのindexをランダムに並び変えて、それぞれに0〜カード総数分昇順にキーを割り当てる
            //----このキーはturn変数で指定する仕様。

            //カードのindex管理変数(card_index)の中からランダムで一つ選ぶ
            let index = Math.floor(Math.random()*card_index.length);

            //ランダムで選んだindexに0スタートからキーを割り当てる
            card_view_turn.push(card_index[index]);

            //添字の要素を配列から削除　。一度選んだものは削除し、重複しないようにする。
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


    //カードのデータをindex番号でフィルタする
    const selected_card:any = cards.filter((_:any,index:any) => index == view_card);


    //選択肢を格納する変数
    const [choice,setChoice] = useState<any>([{
        'id':'',
        'word_mean':'',
    }])

    //正解の選択肢のみ抽出
    var correct_choice:any = cards.filter((_:any,index:any) => index == view_card);

    //正解の選択肢となるカードを取り除く
    var exclude_correct_choice:any = cards.filter((_:any,index:any) => index !== view_card);

    //正解の選択肢を除いた残りのカードからランダムで3つ抽出する
    var incorrect_choice:any = exclude_correct_choice.slice().sort(function(){ return Math.random() - 0.5; }).slice(0, 3);

    // 正解の選択肢と不正解の選択肢を結合してシャッフルする
    var combined_choices = [...correct_choice, ...incorrect_choice].sort(() => Math.random() - 0.5);

    useEffect(() => {
        //正解+不正解の選択肢の配列を変数choiceに格納する
        if(combined_choices){
            setChoice([...combined_choices]);
        }

    }, [cards,view_card]);

    console.log(choice);
    console.log(view_card);


    //正解&不正解の状態を記録する変数。このデータをAPIで送信してカードの暗記状態を更新する
    const [memory,setMemory] = useState<any>([{
        'id':'',
        'memory':'',
    }])


    //シャッフルして進む
    const Shuffle =()=>{
        setTurn(turn + 1);
        setViewCard(card_view_turn[turn]);
        setSelectedAnswer('');
    }

    //正解を表示・非表示する関数
    const Change = () => setChange(!change);

    //正解したデータを記録する関数
    const CorrectMemory = () =>{
        if(user_id == flashcard.user_id){

            //現在表示中のカードのidを取得
            var target:any = cards.find((_:any,index:any) => index == view_card);

            setMemory([{
                id: target.id,
                memory: true
            }, ...memory]);
        }
    }

    //不正解のデータを記録する関数
    const InCorrectMemory = () =>{
        if(user_id == flashcard.user_id){

            //現在表示中のカードのidを取得
            var target:any = cards.find((_:any,index:any) => index == view_card);

            setMemory([{
                id: target.id,
                memory: false
            }, ...memory]);
        }
    }

    //クイズの結果のデータを配列でバックエンドに送りカードの暗記状態を更新
    const UpdateMemory = () =>{

        //単語帳の所有者のみが更新できる
        if(user_id == flashcard.user_id){
            const params = {
                memorys:JSON.stringify(memory)
            }

            axios.post('/api/card/quiz/memory/update',params).then((response) => { 
                alert('s');
            }).catch((error) => { 
                //alert('問題が発生しました。データの更新が行われませんでした。');
                //console.log(error);
            });
        }

    }

    //クイズ終了時に結果を送る
    if(turn > cards.length){
        UpdateMemory();
    }

    //正解
    const Correct =()=>{

        const params = {
            flashcard_id:flashcard_id,
            card_index:view_card,
        }

        setTimeout(() => {
            Shuffle();

            //正解数をカウントする
            countCollect();

            //正解を記録(DB更新用変数を更新)
            CorrectMemory();
        }, 500);
    }

    //不正解
    const Incorrect =()=>{

        const params = {
            flashcard_id:flashcard_id,
            card_index:view_card,
        }

        setTimeout(() => {
            Shuffle();

            //不正解を記録(DB更新用変数を更新)
            InCorrectMemory();
        }, 500);
    }

    console.log(memory);

    //正解選択肢コンポーネント
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
                    className="block w-full h-12 py-3 px-11 bg-gray-200 rounded-full  text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-green-200 truncate"
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

    //不正解選択肢コンポーネント
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
                    className="block w-full h-12 py-3 px-11  bg-gray-200 rounded-full  text-center focus:outline-none hover:bg-gray-200 peer-checked:bg-red-200 truncate"
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
                <h1 className="w-40 p-3">クイズ</h1>

                <div className="w-full">

                    {turn > 0 && turn <= cards.length &&
                        <div className="w-full p-3 text-center /bg-sky-400">{turn} / {cards.length}</div>
                    }

                    {turn == 0 &&
                        <div className="flex w-fit h-10 ml-auto mr-auto  my-0.5 /bg-green-700 border border-gray-300 bg-white px-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                            </svg>
                            <select name="" id="" className="block w-30 /h-10 px-2  bg-white ml-auto mr-auto focus:outline-none cursor-pointer" onChange={(e:any) => setMode(e.target.value)}>
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

            <div className="ml-3">
                単語帳:{flashcard.title}
            </div>

            <div className="/bg-green-400 absolute inset-0 flex items-center justify-center w-100 h-full">
                
                <div className="w-full px-2 /bg-slate-600">

                    <div className="w-fit ml-auto mr-auto">


                        {card_view_turn.length == 0 &&
                            <>
                            <p className="mb-2 text-center">
                                クイズをスタートします。<br/>
                                全{cards.length}問
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
                                    
                                    <div className="flex w-full h-48 md:h-96 items-center justify-center">
                                        <div>
                                            <button className="block w-fit ml-auto mr-auto my-3 px-3 bg-slate-400 rounded-full text-white" onClick={Change}>もどる</button>
                                            <div className="text-6xl">{card.word_mean}</div>
                                        </div>
                                    </div>
                                </div>

                            :
                                <div>
                                    <button className="block w-fit ml-auto mr-auto px-3 bg-amber-200 rounded-full" onClick={Change}>答えをみる</button>
                                    <div className="flex w-full h-48 md:h-96 /border /border-gray-300 /rounded text-6xl items-center justify-center" id="card_id" data-id={card.id}>
                                        {card.word}
                                        
                                    </div>
                                    <div>
                                        {choice.map( (choice:any,index:number) => (
                                            <ul key={index}>
                                            {choice.id == card.id?
                                                <CorrectAnswer choice={choice.word_mean} selected_answer={selected_answer} action={Correct} />
                                                :
                                                <InCorrectAnswer choice={choice.word_mean} selected_answer={selected_answer} action={Incorrect} />
                                            }
                                            </ul>
                                        ))}  
                                    </div>
                                </div>
                            }
                            </>
                            
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

                            <Link to={`/flashcard/${flashcard_id}`} className="w-fit">
                                <button className="block mt-10 ml-auto mr-auto px-1 w-full md:px-0 md:w-48 h-12 rounded-full bg-amber-300 text-2xl text-white">
                                    終了する
                                </button>
                            </Link>
                        </div>
                    }

                </div>
                
            </div>

        </main>
    );
}