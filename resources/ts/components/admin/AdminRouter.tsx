/**  
* 権限ユーザーのみアクセスできるページのルーティング処理
* 
*/
import { FC } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';



export const AdminRouter:FC = () => {

    const [checkAdmin, setCheckAdmin] = useState<boolean>(true);


    useEffect(()=>{        

        //成功の場合、認証必須ページにアクセス許可
        axios.get('/api/admin').then((response) => { 

            setCheckAdmin(true);
            
        })    
        
        //失敗(トークン有効期限切れor無し)の場合以下はログインへ強制移動
        .catch((error) => { 
            
            setCheckAdmin(false);
            window.location.href = '/home';
            
        });

    },[]);


    //未承認ユーザーがアクセスした場合はログインページに移動させる
    return checkAdmin ? <Outlet /> : ( window.location.href = '/home');

};

