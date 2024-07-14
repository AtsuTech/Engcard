import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { NextSlideButton } from "./parts_component/NextSlideButton";
import { PrevSlideButton } from "./parts_component/PrevSlideButon";
import { CloseButton } from "./parts_component/CloseButton";
import { Card } from "./Card";

const FinishRead = () => {
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

export const Read:FC =()=>{

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

    document.title = "読む:"+flashcard.title;

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
        <div className="/h-screen text-gray-500">
            
            <header className="/sticky /top-0 w-full/h-12 border-b border-b-gray-300 /bg-slate-600 /z-50">

                <div className="flex w-full">
                    <h1 className="w-40 p-3 /text-amber-400 font-bold /text-center">読む</h1>

                    <div className="w-full">
                        <div className="flex w-fit items-center p-3 ml-auto mr-auto">
                            
                            <select name="" className="text-center bg-white border border-slate-300 rounded-lg" id="" onChange={(e:any) => setTurn(Number(e.target.value))}>
                                <option disabled selected>移動</option>
                                {cards.map( (card:any,index:number) => (
                                    <option className="text-center" value={index} selected={turn == index}>{index + 1}</option>
                                ))}
                            </select>
                            <div className="w-fit ml-2">
                                 / {cards.length}      
                            </div>
                        </div>
                    </div>

                    <div className="w-40 relative">
                        <div className="absolute inset-y-0 right-1 flex my-2 ">
                        <FinishRead />
                        </div>
                    </div>
                </div>

            </header>


            <div className="/absolute /inset-0 flex items-center mt-1 w-full">

                <div className="flex items-center justify-center w-10 /bg-pink-600 h-screen">
                    <div>
                        {turn > 0 && <PrevSlideButton onClick={Back}/>}
                    </div>
                </div>
                
                <div className="flex items-center justify-center w-full /bg-green-600 /overflow-y-auto /h-full">
                    {selected_card.map( (card:any,index:number) => (

                        <div key={index} className="w-full /flex /flex-col /items-center /justify-center /h-screen">
                            
                            <div>

                                <Card
                                    date={card.created_at}
                                    memory={card.memory}
                                    imgflag={card.img_path ? true : false }
                                    img_path={location.protocol + '//' + window.location.host + '/storage/images/card/'+ card.user_id + '/' + card.flashcard_id + '/' + card.img_path}
                                    word={card.word}
                                    word_mean={card.word_mean}
                                    category={card.category}
                                    sub_word_mean={card.sub_word_mean}
                                    sentence={card.sentence}
                                    sentence_mean={card.sentence_mean}
                                    link={card.link}
                                />
      
                            </div>

                        </div>                          
                        
                    ))}

                </div>

                <div className="flex items-center justify-center w-10 /bg-pink-600 h-screen">
                    <div>
                        {turn < (cards.length - 1) && <NextSlideButton onClick={Next} />}
                    </div>
                </div>

            </div>

        </div>
    );
}