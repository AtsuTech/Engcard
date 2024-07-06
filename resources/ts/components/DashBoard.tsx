import { FC } from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { ProfileImage } from "./ProfileImage";
import { Title } from "./parts_component/Title";
//import { RegisterEmailVerify } from "./auth/RegisterEmailVerify";
//import { FollowingUser } from "./FollowingUser";
import { FollowedUser } from "./FollowedUser";



export const DashBoard: FC = () => {

    document.title = "ダッシュボード";


    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const API_TOKEN = auth_token.token;

    const [me ,setMe] = useState<any>([]);

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/account/me').then((response:AxiosResponse|any) => { 
            console.log(response.data);

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
                <li className="relative w-full px-4 py-4 h-fit border-b border-gray-300 rounded-t-lg">
                    <div className="flex">

                        <div>
                            <ProfileImage width={80} height={80} />
                        </div>
                        
                        <div className="w-full ml-3">
                            <span  className="text-2xl">
                                {me.name}
                            </span>
                            <br />
                            <span className="text-xs text-gray-300">
                                @{me.personal_id}
                            </span>

                            <div className="flex w-full text-xs md:text-base">
                                <div className="w-fit pr-4">
                                    {me.following && 
                                        <Link to={`/following/${me.personal_id}`}>
                                            <b>{me.following.length}</b> フォロー
                                        </Link>  
                                    }
                                </div>
                                <div className="w-fit pr-4">
                                    {me.followed && 
                                        <Link to={`/followed/${me.personal_id}`}>
                                            <b>{me.followed.length}</b> フォロー
                                        </Link>  
                                    }
                                </div>
                            </div> 
                                  
                        </div>

                    </div>
                    <div className="mt-2 text-sm md:text-base">
                        {me.comment}
                    </div>

                    <div className="absolute top-3 right-3">
                        <Link to="/user/update">
                            <button className="w-16 p-1 bg-amber-400 text-white rounded-full">編集</button>
                        </Link>
                    </div>
                </li>
                <li className="w-full px-4 py-4 text-sm md:text-base border-b border-gray-300 rounded-t-lg">
                    メールアドレス : {me.email}
                </li>
                <li className="w-full px-4 py-4 text-sm md:text-base rounded-b-lg">
                    登録日 : {me.created_at}
                </li>
            </ul>

            <div className="flex mt-3">

                <div className="w-1/3 border border-gray-300 rounded-lg mr-1">
                    <div className="text-center py-2">
                        単語帳
                    </div>
                    <div className="text-center text-amber-400 font-bold text-4xl py-2">
                        {me.flashcards ? me.flashcards.length : 0 }
                    </div>
                </div>

                <div className="w-1/3 border border-gray-300 rounded-lg mx-1">
                    <div className="text-center py-2">
                        単語カード
                    </div>
                    <div className="text-center text-amber-400 font-bold text-4xl py-2">
                        {me.cards ? me.cards.length : 0 }
                    </div>
                </div>

                <div className="w-1/3 border border-gray-300 rounded-lg ml-1">
                    <Link to="/flashcardfavorite">
                        <div className="text-center py-2">
                            お気に入り
                        </div>
                        <div className="text-center text-amber-400 font-bold text-4xl py-2">
                            {me.flashcard_favorites ? me.flashcard_favorites.length : 0 }
                        </div>
                    </Link>
                </div>

            </div>


            
        </div>
    );

}