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

                <button onClick={UnFavorited} className="border border-gray-200 bg-white text-grey-darkest py-0.5 px-1 rounded inline-flex items-center">
                    <div>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400 pr-0.5">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>                        
                    </div>
                    <span>{flashcard_favorite}</span>
                </button>
            :
                
                // いいねしてない場合の表示

                <button onClick={Favorited} className="border border-gray-200 bg-white text-grey-darkest py-0.5 px-1 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span>{flashcard_favorite}</span>
                </button>

            }

        </>
    );
}