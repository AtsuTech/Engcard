import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BageDark } from "./parts_component/BageDark";
import { BageLight } from "./parts_component/BageLight";
import { OperateFlashCardMenu } from "./OperateFlashCardMenu";

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
            <div className="flex w-full bg-yellow-400 h-fit mb-5 rounded-lg /border-l-8 pl-3 /border-yellow-500">
                {/* <div className="w-20 h-30 bg-yellow-500">
                    <span className="block w-5 h-5 bg-gray-400 rounded-full my-2.5 mr-3"></span>
                </div> */}
                <span className="block w-5 h-5 /border /border-gray-300 bg-white rounded-full mt-4 mr-3 shadow-lg"></span>
                <h1 className="text-4xl py-2 text-gray-500">自分の単語帳</h1>
            </div>

            <div className="block w-full ml-auto mr-auto mb-10 rounded-3xl bg-white p-5">
                <h1 className="text-2xl text-center mb-2">全{myflashcards.length}冊</h1>
                {
                    myflashcards.map( (myflashcard:any) => (

                        <div  key={myflashcard.id} className="block w-full h-28 p-3 mb-2 border border-gray-300 rounded">

                            <div className="flex">
                                <div className="w-full">
                                    {myflashcard.access == 0?
                                        <BageDark value={"公開"}/>
                                        :
                                        <BageLight value={"非公開"}/>
                                    }
                                </div>

                                <OperateFlashCardMenu id_encrypt={myflashcard.id_encrypt} id={myflashcard.id} Update={Update} />
                            </div>
                                                        
                            <Link to={`/flashcard/${myflashcard.id_encrypt}`} className="block w-full mt-2">
                                <h5 className="text-3xl">{myflashcard.title}</h5>
                            </Link>

                            <div className="text-right">
                                <small className="mr-2">{myflashcard.updated_at}</small>
                                <small>カード数:{myflashcard.cards.length}枚</small>
                            </div>
                            
                        </div>
                        
           
                    ))
                }
            </div>
        </>

    )
}