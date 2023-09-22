import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export const DeleteCard:FC<{id:any,flashcard_id:any}> = ({id,flashcard_id}) => {

    const navigate = useNavigate();

    function Delete(){
        
        
        const confirm = window.confirm("削除しますが本当によろしいですか？");

        if (confirm) {
            axios.post('/api/card/delete',{card_id: id}).then((response:AxiosResponse) => { 
                alert("削除しました。");
                //setUpdate(true);
                navigate('/flashcard/'+flashcard_id);
            }).catch((error) => { 
                alert("失敗しました。");
                console.log(error);
            });
        };
    }

    return(
        <>
            <button onClick={() => Delete()} className="bg-rose-600 w-14 h-10 text-white rounded-lg shadow-lg font-medium text-1xl">
                削除
            </button>
        </>
    );
}