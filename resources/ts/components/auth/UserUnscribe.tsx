import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { PageBack } from "../parts_component/PageBack";
import { Title } from "../parts_component/Title";


export const UserUnscribe:FC =()=>{

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);

    const Unscribe = () =>{
        //DBにデータ送る
        axios.post('/api/user/unscribe').then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('退会しました');

            // トークン削除
            removeCookie("token");

            // ユーザーネーム削除
            localStorage.removeItem('user_name');

            // ステータスを401に書き換える
            localStorage['auth_status'] = 401;

            //ログアウト後、ログインページに移動
            window.location.href = '/login'
            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
    }

    const [open,setOpen] = useState(false);

    const toggle = () =>{
        if(open){
            setOpen(false);
        }else if(!open){
            setOpen(true);
        }
    }

    useEffect(() => {
        const modal = document.getElementById("modal") as HTMLDialogElement;
        if (open) {
            modal.showModal();
        } else {
            modal.close();
        }
    }, [open]);

    return(
        <div className="block rounded-3xl bg-white text-slate-600 p-5 /h-96">

            <div className="flex">
                <PageBack />
                <Title title="退会" />
            </div>

            <p className="my-3">
                退会するにあたり、以下をご確認ください。
            </p>

            <div className="w-full bg-slate-200 py-2 rounded-lg">
                <div className="py-2 text-center font-semibold border-b border-b-slate-400">注意事項</div>
                <div className="px-8 my-3">
                    <ul className="list-disc">
                        <li className="py-2">退会すると、全ての単語帳(カード含む)がデータベースから削除され復元できません。</li>
                        <li className="py-2">退会すると、あなたの全てのお気に入り、フォローが全て解除(削除されます)</li>
                        <li className="py-2">退会した後に再登録しても、以前のデータを引き継ぐことはできません</li>
                    </ul>                    
                </div>
            </div>

            <p className="py-4 text-right">注意事項を確認した上で、退会処理に進みますか？</p>


            <div className="w-full flex justify-end">
                <button className="w-fit px-3 h-12 text-white bg-amber-400 rounded-full" onClick={toggle}>はい、確認しました</button>
            </div>

            
            <dialog 
                className="w-96 h-30 ml-auto mr-auto bg-white p-5 shadow-lg rounded-2xl text-slate-500 border border-slate-300"
                id="modal"
            >
                
                <div className="p-3 text-center text-2xl">最終確認</div>
                <p className="px-2 py-3 text-center">退会処理を実行します。<br/>本当によろしいですか？</p>

                <div className="flex">
                    <button className="w-full h-12 m-2 text-white bg-slate-400 rounded-full" onClick={toggle}>キャンセル</button>
                    <button className="w-full h-12 m-2 text-white bg-rose-500 rounded-full" onClick={Unscribe}>退会</button>
                </div>

            </dialog>

        </div>
    );
}