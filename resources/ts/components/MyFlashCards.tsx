import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Title } from "./parts_component/Title";
import { OperateFlashCardMenu } from "./OperateFlashCardMenu";
import { FlashCardCountBage } from "./parts_component/FlashCardCountBage";
import { PublicIcon } from "./parts_component/PublicIcon";
import { PrivateIcon } from "./parts_component/PrivateIcon";
import { MakeFlashCardButton } from "./parts_component/MakeFlashCardButton";

export const MyFlashCards:FC =() =>{

    document.title = "単語帳";

    const [myflashcards,setmyflashcards] = useState([]);
    const [update,setUpdate] = useState<boolean>(false);
    function Update(){
        if(update){
            setUpdate(false);
        }else if(!update){
            setUpdate(true);
        }
    }
 


    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/flashcard/my').then((response) => { 
            console.log(response);
            setmyflashcards(response.data);

        }).catch((error) => { 
            console.log(error);
        });
    },[update]);


    const [filter,setFilter] = useState<number>(-1);
    if(filter > -1){
        var flashcards:any = myflashcards.filter((flashcards:any) => flashcards.access.type == filter);
    }else if(filter == -1){
        var flashcards:any = myflashcards.filter((flashcards:any) => flashcards.access.type > -1);
    }

    
    // function FlashcardLink() {
        
    // }

    return (
        <>

            <div className="block w-full ml-auto mr-auto mb-10 rounded-3xl bg-white p-5">

                
                <div className="flex">

                    <div className="w-full">
                        <Title title={"自分の単語帳"} />
                    </div>

                    <div>
                        <div className="flex flex-row-reverse">
                            <div className="flex w-fit h-hit items-center justify-center border bg-gray-200 p-2 rounded-full /mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>

                                <select name="" id="" className="bg-gray-200 focus:outline-none cursor-pointer" onChange={(e:any) => setFilter(e.target.value)}>
                                    <option value={-1}>すべて</option>
                                    <option value={0}>非公開</option>
                                    <option value={1}>公開</option>
                                </select>
                            </div>
                        </div>                        
                    </div>

                </div>



                <div className="flex items-center justify-center my-3">
                    <FlashCardCountBage value={flashcards.length} />
                </div>

                {flashcards.length == 0 && 
                    <>
                        <div className="flex items-center justify-center h-96">
                            <div>
                                <div className="mb-2">単語帳がありません</div>
                                <button className="lex justify-center items-center block w-full h-16 bg-amber-400 text-center text-white rounded-full">
                                    <Link to="/flashcard/create">単語帳を作る</Link>
                                </button>
                            </div>
                        </div>
                        
                    </>
                   
                }
                
                    
                
                
                {
                    flashcards.map( (myflashcard:any) => (
                        
                        <div  key={myflashcard.id} className="block w-full h-fit mb-4 border-2 border-yellow-400 rounded-lg">

                            <div className="flex w-full h-fit bg-yellow-400 p-1">
                                <div className="w-full">
                                    {myflashcard.access.type == 0 && <PrivateIcon value={myflashcard.access.item}/>}
                                    {myflashcard.access.type == 1 && <PublicIcon value={myflashcard.access.item} />}
                                </div>

                                <OperateFlashCardMenu uuid={myflashcard.uuid} id={myflashcard.id} Update={Update} />
                            </div>

                            <Link to={`/flashcard/${myflashcard.uuid}`} className="block w-full">

                                <div className="p-2">
                                    <h5 className="text-xl pb-2 break-all">{myflashcard.title}</h5>
                                    {myflashcard.description != null &&
                                        <div className="wfull p-2 bg-gray-200 rounded-lg text-xs">
                                            <div>
                                                <b>概要</b>
                                            </div>
                                            <p>
                                                {myflashcard.description}
                                            </p>
                                        </div>
                                    }
                                </div>
                                    
                                <div className="text-right pr-2 text-xs">
                                    <small className="mr-2">{myflashcard.updated_at}</small>
                                    <small>カード数:{myflashcard.cards.length}枚</small>
                                </div>
                            </Link>
                            
                        </div>
                        
           
                    ))
                }
            </div>
        </>

    )
}