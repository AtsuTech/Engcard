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
                    <img src={location.protocol + '//' + window.location.host + "/material/images/brand-logo.png"} alt="" width={110} className="ml-4 mr-4 rounded-lg" />
                </div>  

                <div className="hidden md:block">
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
                            <Link to="/flashcard/my" className="block w-24 h-12 mt-4 p-1 ml-2 text-center text-gray-600">
                                単語帳
                            </Link>
                        </li>
                    </ul>                    
                </div>

                
    
    
                <div className="flex mr-2">
                    { auth_token.token != null ?
                        <div className="relative">
                            
                            <div className="pt-4 pr-4" onClick={Disp}>
                                <ProfileImage width={50} height={50}/>
                            </div>

                            {account_menue &&
                                <div className="absolute right-0  mt-2 p-2 w-40 h-fit bg-white rounded-lg shadow-lg text-gray-500">
                                    <div className="flex">
                                        <div>
                                            <ProfileImage width={20} height={20}/>
                                        </div>
                                        <b>{user_name}</b>
                                    </div>
                                    
                                    <ul className="block w-full text-center">
                                        <li className="block w-full p-3">
                                            <Link to="/dashboard">
                                                ダッシュボード
                                            </Link>
                                        </li>
                                        <li className="w-full p-3">
                                            <Link to="">
                                                マイページ
                                            </Link>
                                        </li>
                                        <li>
                                            <Logout />
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