import { FC } from "react"
import { Link } from 'react-router-dom';
import { Logout } from "./auth/Logout";

export const NavBar: FC = () => {

    const isAuthenticated : string | null = localStorage.getItem('auth_status');
    const user_name = localStorage.getItem('user_name');

    return (
        <header>
            <h1>ガゾタン</h1>
                
            { isAuthenticated == '200' ?  
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