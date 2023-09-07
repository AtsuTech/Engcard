import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';

export const FlashCard:FC = () =>{

    document.title = "単語帳詳細"

    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    const[notFonund,setNotFonund] = useState(false);

    const [flashcard,setFlashcard] = useState({
        title:'',
        created_at:'',
        updated_at:'',
        user_name:'',
    });

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 
            console.log(response);
            setFlashcard({
                title:response.data.title,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
                user_name:response.data.user.name,
            });

        }).catch((error) => { 
            console.log(error);
            setNotFonund(true);
        });
    },[]);

    return(
        <>
            
            {notFonund ?
                
                <div>ページが見つかりません</div>

                :
                
                <div>
                    <h1>単語帳詳細</h1>
                    <div>{flashcard.title}</div>
                    <div>
                        <small>投稿:{flashcard.user_name}</small>
                    </div>
                    
                    <small>{flashcard.created_at}</small>

                </div>
                
            }

        </>
    );
}