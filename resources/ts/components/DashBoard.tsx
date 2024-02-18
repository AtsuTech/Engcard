import { FC } from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { ProfileImage } from "./ProfileImage";
import { Title } from "./parts_component/Title";
import { RegisterEmailVerify } from "./auth/RegisterEmailVerify";



export const DashBoard: FC = () => {

    document.title = "ダッシュボード";


    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const API_TOKEN = auth_token.token;

    const [me ,setMe] = useState<any>([]);

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/account/me').then((response:AxiosResponse|any) => { 
            console.log(response.data);
            
            // setMe({
            //     name:response.data.name,
            //     email:response.data.email,
            //     password:response.data.password,
            //     created_at:response.data.created_at,  
            //     personal_id:response.data.personal_id,           
            // });

            setMe(response.data);

        }).catch((error:AxiosError|any) => { 
            // alert('NG');
            console.log(error.response.status);
            localStorage.setItem('auth_status',error.response.status);
        });
    },[]);

    return(
        <div className="block rounded-3xl bg-white text-slate-600 p-5">

            <Title title="ダッシュボード" />

            <ul className="w-full mt-5 /text-sm font-medium bg-white border border-gray-300 rounded-lg">
                <li className="w-full px-4 py-4 h-fit border-b border-gray-300 rounded-t-lg">
                    <div className="flex">
                        <ProfileImage width={80} height={80} />
                        <div className="w-full ml-3">
                            <span  className="text-2xl">
                                {me.name}
                            </span>
                            <br />
                            <span className="text-sm text-gray-300">
                                @{me.personal_id}
                            </span>             
                        </div>
                        <Link to="/user/update">
                            <button className="w-16 p-1 bg-amber-400 text-white rounded-full">編集</button>
                        </Link>
                    </div>
                </li>
                <li className="w-full px-4 py-4 border-b border-gray-300 rounded-t-lg">
                    メールアドレス : {me.email}
                </li>
                <li className="w-full px-4 py-4 border-b border-gray-300">
                    登録日 : {me.created_at}
                </li>
                <li className="w-full px-4 py-4 border-b border-gray-300">
                    フォロー : {me.following ? me.following.length : 0}
                </li>
                <li className="w-full px-4 py-4 rounded-b-lg">
                    フォロワー : {me.followed ? me.followed.length : 0}
                </li>
            </ul>

            <div className="mt-5">設定</div>         
            <ul className="w-full /text-sm font-medium bg-white border border-gray-300 rounded-lg">
                <li className="w-full px-4 py-4 border-b border-gray-300 rounded-t-lg">
                    <Link to="/user/password/update">パスワード変更</Link>
                </li>

                <li className="w-full px-4 py-4 border-b border-gray-300">
                    <Link to="/category/setting">単語カテゴリ設定</Link>
                </li>
                <li className="w-full px-4 py-4 rounded-b-lg text-rose-500">
                    <Link to="/user/unscribe">退会</Link>
                </li>
            </ul>

            <div className="flex mt-3 border border-gray-200 rounded-lg">
                <button className="block w-full h-12 text-center border-r border-gray-200">
                    単語帳
                </button>
                <button className="block w-full h-12 text-center border-r border-gray-200">
                    単語カード
                </button>
                <button className="block w-full h-12 text-center">
                    お気に入り
                </button>
            </div>


            
        </div>
    );

}