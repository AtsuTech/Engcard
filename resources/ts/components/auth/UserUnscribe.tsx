import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";


export const UserUnscribe:FC =()=>{

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);

    const Unscribe = () =>{
        //DBにデータ送る
        axios.post('/api/user/unscribe').then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('退会しました');

            // トークン削除
            removeCookie("token");

            // ユーザーネーム削除
            localStorage.removeItem('user_name');

            // ステータスを401に書き換える
            localStorage['auth_status'] = 401;

            //ログアウト後、ログインページに移動
            window.location.href = '/login'
            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
    }

    return(
        <>
            <h1>退会</h1>
            <button onClick={Unscribe}>退会する</button>
        </>
    );
}