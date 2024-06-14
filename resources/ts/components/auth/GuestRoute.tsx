/**  
* 認証済みユーザーに表示させたくないページのルーティング処理
* 
*/
import { FC } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { Outlet } from 'react-router-dom';



export const GuestRoute:FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const [API_TOKEN,setAPI_TOKEN] = useState<any>(auth_token.token);
    const [UnAuthenticated, setUnAuthenticated] = useState<boolean>(true);

    useEffect(()=>{

        // cookieに保存されたトークンでauth承認APIにアクセス
        axios.get('/api/user',{ headers: { Authorization: "Bearer " + API_TOKEN } })

        //成功の場合、認証必須ページにアクセス許可
        .then((response) => { 

            setUnAuthenticated(false);
            
        })    
        
        //失敗(トークン有効期限切れor無し)の場合以下はログインへ強制移動
        .catch((error) => { 
            
            setUnAuthenticated(true);

        });

    },[]);


    //承認ユーザーがアクセスした場合はマイページに移動させる
    return UnAuthenticated ? <Outlet /> : ( window.location.href = '/home') ;

};

