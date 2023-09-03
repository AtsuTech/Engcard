import { FC } from "react";
import { Link } from 'react-router-dom';

export const Index: FC = () => {


    return (
        <>
            <div>
                <h1>Wellcome to SAP_app</h1>

                <p>
                    This is spa base project using bellow Frameworks and Librarys.
                </p>

                <ul>
                    <li>Laravel</li>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>JWT</li>
                </ul>

                <p>
                    This project is including bellow functions.
                </p>

                <ul>
                    <li>register</li>
                    <li>verify registered email</li>
                    <li>login</li>
                    <li>logout</li>
                    <li>password reset</li>
                    <li>auth routeing</li>
                </ul>


                <button>
                    <Link to="login">ログイン</Link>
                </button>

                <button>
                    <Link to="register">新規登録</Link>
                </button>

            </div>
        </>

    )

}