import { FC } from "react";
import { Link } from 'react-router-dom';

export const RegisterComplete: FC = () => {


    return (
        <>
            <div>
                <h1>登録が完了しました。</h1>
                <div>
                    <Link to="top">利用開始</Link>
                </div>
            </div>
        </>

    )

}