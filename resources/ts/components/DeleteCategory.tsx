import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';


export const DeleteCategory:FC<{id:any,Refresh:any}> = ({id,Refresh}) => {

    function Delete(){

        const alert_message = "削除すると、このカテゴリが設定されている全てのカードからカテゴリが削除されます。本当によろしいですか？"
        
        
        const confirm = window.confirm(alert_message);

        if (confirm) {
            axios.post('/api/categories/my/delete',{id: id}).then((response:AxiosResponse) => { 
                alert("削除しました。");
                Refresh();
            }).catch((error) => { 
                alert("失敗しました。");
                console.log(error);
            });
        };
    }

    return(
        <>
            <button className="w-20" onClick={Delete}>削除</button>
        </>
    );
}