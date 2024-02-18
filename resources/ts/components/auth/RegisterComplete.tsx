import { FC } from "react";
import { Link } from 'react-router-dom';
import { Title } from "../parts_component/Title";

export const RegisterComplete: FC = () => {

    function Go(){
        //window.location.href = '/home'
        window.location.href = '/login'
    }

    return (
        <>
            <div className="block xl:w-1/2 sm:w-full ml-auto mr-auto bg-white text-slate-600 p-5">
                <Title title="登録が完了しました。"/>
                <div>ログインして利用開始して下さい</div>

                <button onClick={Go}>ログインして利用開始</button>
            </div>
        </>

    )

}