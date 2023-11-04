import { FC, useState } from "react"
import { Link } from 'react-router-dom';
import { Logout } from "./auth/Logout";
import { Cookies, useCookies } from "react-cookie";
import { ProfileImage } from "./ProfileImage";

export const NavBar: FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const user_name = localStorage.getItem('user_name');

    return (

            <header className="flex justify-between stiky top-0 z-50 flex w-full h-20 bg-amber-400 text-gray-300">
                <h1 className="flex text-white ml-2 font-light">
                <span className="block text-4xl text-white">
                    <img src="/storage/material_img/gazotan.png" alt="" width={170} className="mt-3 rounded-lg" />
                </span>
                    <ul className="flex">
                        <li className="m-2">
                            <Link to="/home" className="block w-20 h-12 mt-4 p-1 ml-2 text-center text-gray-600">
                                ホーム
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/flashcard/create" className="block w-20 h-12 mt-4 p-1 ml-2 text-center text-gray-600">
                                つくる
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/dashboard" className="block w-24 h-12 mt-4 p-1 ml-2 text-center text-gray-600">
                                マイページ
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/flashcard/my" className="block w-24 h-12 mt-4 p-1 ml-2 text-center text-gray-600">
                                単語帳
                            </Link>
                        </li>
                    </ul>
                </h1>
    
    
                <div className="flex mr-2">
                    { auth_token.token != null ?
                        <>
                            <Logout />
                            <div className="pt-4 pr-4">
                                <ProfileImage width={50} height={50}/>
                            </div>
                            
                        </>
                    :
                        <>
                            <Link to="/login">
                                <button className="block w-20 h-12 mt-4 p-1 ml-2 text-center text-gray-600">ログイン</button>
                            </Link>
                            <Link to="/register">
                                <button className="block w-20 h-12 mt-4 p-2 ml-2 text-center text-amber-400 bg-gray-600 border border-gray-600 rounded-xl">登録</button>
                            </Link>
                        </>
                    }
    
                </div>
            </header>
    )

}