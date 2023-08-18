import { FC } from "react"
import { Link } from 'react-router-dom';

export const NavBar: FC = () => {


    return (
        <header>
            <h1>ガゾタン</h1>
                
            <ul>
                <li><Link to="login">ログイン</Link></li>
                <li><Link to="about">新規登録</Link></li>
            </ul>
        </header>
    )

}