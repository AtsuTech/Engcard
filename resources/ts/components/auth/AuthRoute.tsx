// ログインユーザーのみアクセスできる制限をかける関数
import { FC } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { Outlet } from 'react-router-dom';
//import { TokenRefresh } from "../TokenRefresh";


/**  
* ログイン処理の際に、ローカルストレージに200ステータスを保存している。
* cookieに承認トークンを保存しているので、このトークンで承認成功すれば、ログインユーザーのみページのアクセスを許可する。
* トークンでの承認が失敗した場合、ローカルストレージのステータスを401に上書きしてページのアクセスを拒否する。
*/

export const AuthRoute:FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const [API_TOKEN,setAPI_TOKEN] = useState<any>(auth_token.token);
    const [Authenticated, setAuthenticated] = useState<boolean>(true);

    //トークンリフレッシュ関数
    function TokenRefresh(){

        // 年・月・日・曜日を取得しトークン有効残り日数を計算
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const date = ('0' + currentDate.getDate()).slice(-2);
        const exp:any = new Date(localStorage.getItem("expires_in") as string);
        const now:any = new Date(year +'-'+ month +'-'+ date);
        const diff:number = (exp - now)/ 86400000;

        if(diff < 0){
            
            axios.post('/api/refresh', { headers: { Authorization: "Bearer " + API_TOKEN, Accept:"application/json" } }).then((response) => { 

                //アクセストークンが有効なものなら、トークンをリフレッシュ
                setCookie("token",response.data.new_token);
                setAPI_TOKEN(response.data.new_token);
                localStorage['expires_in'] = response.data.expires_in;
                setAuthenticated(true);
                location.reload();
                
            })
        }
    }

    //トークン切れの場合は、トークンリフレッシュ関数を実行
    TokenRefresh();

    useEffect(()=>{

        // cookieに保存されたトークンでauth承認APIにアクセス
        axios.get('/api/user',{ headers: { Authorization: "Bearer " + API_TOKEN } })

        //成功の場合、認証必須ページにアクセス許可
        .then((response) => { 

            setAuthenticated(true);
            localStorage['auth_status'] = 200;            
            
        })    
        
        //失敗(トークン有効期限切れor無し)の場合以下はログインへ強制移動
        .catch((error) => { 
            
            localStorage['auth_status'] = 401;
            setAuthenticated(false);
            window.location.href = '/login';
        });

    },[]);


    //未承認ユーザーがアクセスした場合はログインページに移動させる
    return Authenticated ? <Outlet /> : ( window.location.href = '/login');

};

