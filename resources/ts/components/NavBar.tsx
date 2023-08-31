import { FC } from "react"
import { Link } from 'react-router-dom';
import { Logout } from "./auth/Logout";
import { Cookies, useCookies } from "react-cookie";
export const NavBar: FC = () => {
    
    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const user_name = localStorage.getItem('user_name');

    return (
        <header>
            <h1>ガゾタン</h1>
                
            { auth_token.token != null ?
                <div>
                    <Logout />
                    <div>{user_name}</div>
                </div>
            :
                <ul>
                    <li><Link to="login">ログイン</Link></li>
                    <li><Link to="about">新規登録</Link></li>
                </ul>
            }
            
        </header>
    )

}