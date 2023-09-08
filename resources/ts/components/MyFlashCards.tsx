import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { FlashCardStyle } from "./FlashCardStyle";

export const MyFlashCards:FC =() =>{

    document.title = "単語帳";

    const [myflashcards,setmyflashcards] = useState([]);
    const [update,setUpdate] = useState<boolean>(false);


    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/flashcard/my').then((response) => { 
            console.log(response);
            setmyflashcards(response.data);

        }).catch((error) => { 
            console.log(error);
        });
    },[update]);

    const Delete = (id:number) =>{
        
        const confirm = window.confirm("削除しますが本当によろしいですか？");

        if (confirm) {
            axios.post('/api/flashcard/delete',{id: id}).then((response) => { 
                alert("削除しました。");
                setUpdate(true);
            }).catch((error) => { 
                alert("失敗しました。");
            });
        };
    }

    return (
        <>
            <div>
                <h1 className="text-3xl">単語帳</h1>
            </div>

            <div className="block w-full ml-auto mr-auto mb-10 rounded-3xl bg-white">
                {
                    myflashcards.map( (myflashcard:any) => (

                        

                        <div  key={myflashcard.id} className="block w-full h-30 mb-5 mt-5 p-2 border border-blue-600 rounded">
                            
                            {myflashcard.access == 0?
                                <div>公開</div>
                                :
                                <div className="text-red-600">非公開</div>
                            }
                            <Link to={`/flashcard/${myflashcard.id_encrypt}`}>
                                <h5 className="text-2xl">{myflashcard.title}</h5>
                            </Link>
                            
                            <p>{myflashcard.updated_at}</p>
                            
                            <button className="mr-2 inline-block bg-blue-600 w-14 h-10 text-white rounded-lg shadow-lg font-medium text-1xl">
                                <Link to={`/flashcard/my/edit/${myflashcard.id_encrypt}`} className="block w-full">
                                    編集
                                </Link>
                            </button>

                            <button onClick={() => Delete(myflashcard.id)} className="bg-rose-600 w-14 h-10 text-white rounded-lg shadow-lg font-medium text-1xl">
                                削除
                            </button>

                        </div>
                        
           
                    ))
                }
            </div>
        </>

    )
}