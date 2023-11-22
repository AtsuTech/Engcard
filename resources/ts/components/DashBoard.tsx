import { FC } from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { ProfileImage } from "./ProfileImage";



export const DashBoard: FC = () => {

    document.title = "ダッシュボード";


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
        <div className="block rounded-3xl bg-white text-slate-600 p-5">
            <h1 className="text-3xl">ダッシュボード</h1>

            <div className="border border-gray-300 p-2 rounded-lg">
                <div className="flex">
                    <ProfileImage width={80} height={80} />
                    <h5 className="text-2xl flex justify-center items-center ml-3">{me.name}</h5>
                    <ProfileImageUpload />
                </div>

                <ul>
                    <li className="flex">
                        <div className="flex w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            メールアドレス :
                        </div>
                        <div className="w-full">
                            {me.email}
                        </div>
                    </li>
                    <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        登録日 : {me.created_at}
                    </li>
                    <li>{me.password}</li>
                </ul>
            </div>
                        
            <ul className="w-full mt-5 /text-sm font-medium bg-white border border-gray-200 rounded-lg">
                <li className="w-full px-4 py-4 border-b border-gray-200 rounded-t-lg">
                    <Link to="/user/update">ユーザー情報編集</Link>
                </li>
                <li className="w-full px-4 py-4 border-b border-gray-200">
                    <Link to="/user/password/update">パスワード変更</Link>
                </li>
                <li className="w-full px-4 py-4 border-b border-gray-200">
                    <Link to="/category/setting">カテゴリ設定</Link>
                </li>
                <li className="w-full px-4 py-4 rounded-b-lg">
                    退会(アカウント)
                </li>
            </ul>


            
        </div>
    );

}