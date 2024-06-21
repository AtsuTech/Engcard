import { FC, useState } from "react"
import { Link } from 'react-router-dom';
import { Logout } from "./auth/Logout";
import { Cookies, useCookies } from "react-cookie";
import { ProfileImage } from "./ProfileImage";


export const NavBar: FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const user_name = localStorage.getItem('user_name');
    const [account_menue,setAccountMenu] = useState(false);
    const Disp =()=>{
        if(account_menue == false){
            setAccountMenu(true);
        }else if(account_menue == true){
            setAccountMenu(false);
        }
    }

    return (

            <header className="flex justify-between stiky top-0 z-50 w-full h-20 bg-amber-400 text-gray-300">

                <div className="flex items-center justify-center w-100 h-20">
                    <img src={location.protocol + '//' + window.location.host + "/material/images/brand-logo.png"} alt="" width={110} className="mx-6 rounded-lg" />
                </div>  

                <div className="hidden md:block w-full">
                    <ul className="flex w-fit font-bold text-slate-600 ml-auto mr-auto">
                        <li className="m-2">
                            <Link to="/home" className="block w-20 h-12 mt-4 p-1 ml-2 text-center">
                                ホーム
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/flashcard/create" className="block w-20 h-12 mt-4 p-1 ml-2 text-center">
                                つくる
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link to="/flashcard/my" className="block w-24 h-12 mt-4 p-1 ml-2 text-center">
                                単語帳
                            </Link>
                        </li>
                    </ul>                    
                </div>

                <ul className="flex w-fit ml-auto mr-0 /bg-slate-500">
                    <li className="m-2">
                        <Link to={'/search'} className="block h-12 mt-4 p-1 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </Link>                            
                    </li>
                </ul>

    
                <div className="flex px-4 /bg-lime-300">
                    { auth_token.token != null ?
                        <div className="relative">
                            
                            <div className="flex items-center justify-center h-20" onClick={Disp}>
                                <div>
                                    <ProfileImage width={50} height={50}/>
                                </div>
                                
                            </div>

                            {account_menue &&
                                <div className="absolute right-0  mt-2 p-2 w-40 h-fit bg-white rounded-lg shadow-lg text-gray-500 z-50">
                                    <div className="flex items-cente">
                                        <div>
                                            <ProfileImage width={25} height={25}/>
                                        </div>
                                        <b className="pl-2">{user_name}</b>
                                    </div>
                                    
                                    <ul className="block w-full text-left">
                                        <li className="block w-full p-1 my-3">
                                            <Link to="/dashboard" className="flex /text-xs" onClick={Disp}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-4 mr-1">
                                                <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
                                                </svg>
                                                ダッシュボード
                                            </Link>
                                        </li>
                                        <li className="w-full p-1 my-3">
                                            <Link to="/setting" className="flex /text-xs" onClick={Disp}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-4 mr-1">
                                                <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z" />
                                                <path fillRule="evenodd" d="M21 12.75a.75.75 0 1 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.216a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.332 8.332 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.29 8.29 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.707.39-1.469.39-2.263a6.74 6.74 0 0 0-.408-2.309Z" clipRule="evenodd" />
                                                </svg>
                                                設定
                                            </Link>
                                        </li>
                                        <li className="p-1 my-3">
                                            <div className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-4 mr-1">
                                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                </svg>
                                                <Logout />
                                            </div>
                                            
                                        </li>
                                    </ul>
                                </div>
                            }    
                        </div>
                        
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