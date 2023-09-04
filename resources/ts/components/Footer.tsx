import { FC } from "react"
import { Link } from 'react-router-dom';
import { Logout } from "./auth/Logout";
import { Cookies, useCookies } from "react-cookie";
export const Footer: FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const user_name = localStorage.getItem('user_name');

    return (

        <footer className="w-full text-white">
            <div className="w-full h-10 bg-gray-700">
                Gazotan
            </div>
            <div className="w-full h-96 bg-gray-800">
                <ul className="block w-1/3 ml-auto mr-auto">
                    <li>
                        <Link to="">About</Link>
                    </li>
                    <li>
                        <Link to="">利用規約</Link>
                    </li>
                    <li>
                        <Link to="">プライバシーポリシー</Link>
                    </li>
                    <li>
                        <Link to="">ガイドライン</Link>
                    </li>
                    <li>
                        <Link to="">ご意見</Link>
                    </li>
                    <li>
                        <Link to="">ヘルプ</Link>
                    </li>
                    <li>
                        <Link to="">広告掲載</Link>
                    </li>
                    
                </ul>
            </div>
        </footer>
    )

}