import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';


export const FlashcardFavorite:FC<{id:any}> = ({id}) =>{

    const [flashcard_favorite,setFlashcardFavorite] = useState<number>();
    const [my_favorite,setMyFavorite] = useState<boolean>(false);

    
    //単語帳のいいね数を取得
    useEffect(()=>{
        // パラメータidでアクセスし、該当データをDBより取得
        axios.get(`/api/flashcard/favorite/get/count/${id}`).then((response) => { 
            console.log(response);
            setFlashcardFavorite(response.data);
        }).catch((error) => { 
            
        });
    },[my_favorite]);


    //単語帳のいいね済みかどうかチェック
    useEffect(()=>{
        // パラメータidでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/favorite/my/check/'+id).then((response) => { 
            console.log(response);
            setMyFavorite(response.data);
        }).catch((error) => { 
            
        });

    },[]);




    //いいねをつける
    const Favorited = () =>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.post('/api/flashcard/favorite/add',{flashcard_id:id}).then((response) => { 
        
            alert('liked!');
            setMyFavorite(true);

        }).catch((error) => { 
            alert('miss!');
            console.log(error);
        });
    }

    //いいねを外す
    const UnFavorited = () =>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.post('/api/flashcard/favorite/delete',{flashcard_id:id}).then((response) => { 
        
            alert('unliked!');
            setMyFavorite(false);

        }).catch((error) => { 
            alert('miss!');
            console.log(error);
        });
    }


    return(
        <>
            {my_favorite ?

                // すでにいいねしている場合の表示

                <button onClick={UnFavorited} className="border border-gray-200 bg-yellow-400 text-grey-darkest py-0.5 px-1 rounded inline-flex items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div>
                    <span>{flashcard_favorite}</span>
                </button>
            :
                
                // いいねしてない場合の表示

                <button onClick={Favorited} className="border border-gray-200 text-grey-darkest py-0.5 px-1 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span>{flashcard_favorite}</span>
                </button>

            }

        </>
    );
}