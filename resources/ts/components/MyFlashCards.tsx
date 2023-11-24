import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BageDark } from "./parts_component/BageDark";
import { BageLight } from "./parts_component/BageLight";
import { OperateFlashCardMenu } from "./OperateFlashCardMenu";
import { FlashCardCountBage } from "./parts_component/FlashcardCountBage";

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


    return (
        <>

            <div className="block w-full ml-auto mr-auto mb-10 rounded-3xl bg-white p-5">

                <h1 className="text-3xl py-2 /text-gray-500">自分の単語帳</h1>
                <div className="flex items-center justify-center my-3">
                    <FlashCardCountBage value={myflashcards.length} />
                </div>
                
                {
                    myflashcards.map( (myflashcard:any) => (
                        
                        <div  key={myflashcard.id} className="block w-full h-28 mb-2 border-2 border-yellow-400 rounded-lg">

                            <div className="flex w-full bg-yellow-400 p-2">
                                <div className="w-full">
                                    {myflashcard.access.type == 0 && <BageLight value={myflashcard.access.item}/>}
                                    {myflashcard.access.type == 1 && <BageDark value={myflashcard.access.item}/>}
                                </div>

                                <OperateFlashCardMenu id_encrypt={myflashcard.id_encrypt} id={myflashcard.id} Update={Update} />
                            </div>

                            <Link to={`/flashcard/${myflashcard.id_encrypt}`} className="block w-full">
                                <h5 className="text-2xl p-1">{myflashcard.title}</h5>
                                    
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