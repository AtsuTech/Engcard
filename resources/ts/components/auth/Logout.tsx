import { FC } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";


export const Logout:FC = () => {

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);

    //ログアウト時に、フロント側のログイン情報を削除
    const Delete = () => {
        // トークン削除
        removeCookie("token");

        // ユーザーネーム削除
        localStorage.removeItem('user_name');

        // ステータスを401に書き換える
        localStorage['auth_status'] = 401;

        //ログアウト後、ログインページに移動
        window.location.href = '/login'
    }

    //ログアウトボタンを押したらこの関数が実行される
    const LogoutAction = () => {

        /*
            HTTPボディを書かないと、ログアウト処理を要求した際にUnauthorize(未承認)のエラーになる。
            POST通信の場合は、受け渡されるパラメータの内容をここに記述。
        */
        const bodyParameters = {
            key: "value"
        };

        
        // トークンでアクセスしてバックエンドでログアウト処理
        axios.post('http://127.0.0.1:8000/api/logout',bodyParameters, { headers: { Authorization: "Bearer " + auth_token.token} }).then((response) => { 

            alert(response.data.message);

            //ログアウト時に、フロント側のログイン情報を削除
            Delete();

        }).catch((error) => { 

            alert('問題が発生したためログアウトします');      

            //ログアウト時に、フロント側のログイン情報を削除
            Delete();
            
        });

    }

    return(
        <button 
            className="block w-full h-10 text-center text-gray-500"
            onClick={LogoutAction}
            >
            ログアウト
        </button>
    );

}

