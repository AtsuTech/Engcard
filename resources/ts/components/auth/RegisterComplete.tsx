import { FC } from "react";
import { Link } from 'react-router-dom';

export const RegisterComplete: FC = () => {

    function Go(){
        window.location.href = '/home'
    }

    return (
        <>
            <div>
                <h1>登録が完了しました。</h1>

                <button onClick={Go}>利用開始</button>
            </div>
        </>

    )

}