import { FC } from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";



export const DashBoard: FC = () => {


    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const API_TOKEN = auth_token.token;

    interface Me{
        name:string;
        email:string;
        password:string;
        created_at:string;
    }

    const [me ,setMe] = useState<Me>({
        name:'',
        email:'',
        password:'',
        created_at:'',
    });

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('http://127.0.0.1:8000/api/user',{ headers: { Authorization: "Bearer " + API_TOKEN } }).then((response:AxiosResponse|any) => { 
            console.log(response);
            
            setMe({
                name:response.data.name,
                email:response.data.email,
                password:response.data.password,
                created_at:response.data.created_at,                
            });

        }).catch((error:AxiosError|any) => { 
            // alert('NG');
            console.log(error.response.status);
            localStorage.setItem('auth_status',error.response.status);
        });
    },[]);

    return(
        <div className="block w-1/3 ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">
            <h1 className="text-3xl">DASHBOARD</h1>
            <ul>
                <li>{me.name}</li>
                <li>{me.email}</li>
                <li>{me.password}</li>
                <li>{me.created_at}</li>
            </ul>

            <Link to="/myflashcards">
                <button className="block mt-5 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">My単語帳</button>
            </Link>
            <Link to="/flashcards/create">
                <button className="block mt-5 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">単語帳を作る</button>
            </Link>
            <Link to="/about">
                <button className="block mt-5 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">暗記する</button>
            </Link>
        </div>
    );

}