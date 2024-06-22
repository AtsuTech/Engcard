import { FC } from "react"
import { Link } from 'react-router-dom';
import { Logout } from "./auth/Logout";
import { Cookies, useCookies } from "react-cookie";
export const Footer: FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const user_name = localStorage.getItem('user_name');

    return (

        <footer className="w-full text-white">

            <div className="fixed w-full bottom-0 bg-slate-700/90 md:hidden">
                <ul className="flex">
                    <li className="w-full">
                        <Link to="/home" className="block h-12 mt-2 mb-2 p-1 ml-2 text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block size-6 w-6 ml-auto mr-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className="text-xs">ホーム</span>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/flashcard/create" className="block h-12 mt-2 mb-2 p-1 ml-2 text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block size-6 w-6 ml-auto mr-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            <span className="text-xs">つくる</span>
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link to="/flashcard/my" className="block h-12 mt-2 mb-2 p-1 ml-2 text-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block size-6 w-6 ml-auto mr-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <span className="text-xs">単語帳</span>
                        </Link>
                    </li>
                </ul>    
            </div>
            
            <div className="hidden md:block bg-orange-500">
                <div className="w-full flex items-center justify-center h-96 bg-gray-800">
                    <ul className="block /md:max-w-4xl /md:w-2/3 w-fit text-center p-6 ml-auto mr-auto">
                        {/* <li className="p-4">
                            <Link to="">About</Link>
                        </li> */}
                        <li className="p-2">
                            <Link to="/termsofservice">利用規約</Link>
                        </li>
                        <li className="p-2">
                            <Link to="/privacypolicy">プライバシーポリシー</Link>
                        </li>
                        {/* <li className="p-4">
                            <Link to="">ガイドライン</Link>
                        </li> */}
                        {/* <li>
                            <Link to="">ご意見</Link>
                        </li> */}
                        {/* <li>
                            <Link to="">ヘルプ</Link>
                        </li> */}
                        {/* <li>
                            <Link to="">広告掲載</Link>
                        </li> */}
                        
                    </ul>
                </div>
                <div>
                    <div className="w-full text-center py-2 bg-gray-700">
                        @Engcard 2024-06-22
                    </div>
                </div>
            </div>


        </footer>
    )

}