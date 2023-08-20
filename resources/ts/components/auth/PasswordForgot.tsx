import { FC } from "react";
import React, { useState} from 'react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export const PasswordForgot: FC = () => {

    const [email, setEmail] = useState<string>();

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setEmail(e.target.value);
    }


    const ResetSubmit = (e:any) =>{
        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        const params = {
            email: email,
        }
      
        axios.post('http://127.0.0.1:8000/api/password/forgot', params).then(function (response) {
            // 送信成功時の処理
            alert('メール送信成功');

        })
        .catch(function (error) {
            // 送信失敗時の処理
            alert('通信に失敗しました');
        });

    }

    return (
        <div className="w-96 ml-auto mr-auto">

            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10">パスワードリセット</h1>

            <form onSubmit={ResetSubmit}>
                <div>
                    <p>メールアドレス</p>
                    <input type="email" name="email" value={email}  
                        onChange={handleInput} 
                        className="block w-full h-10 border border-gray-600 rounded pl-2"
                    />
                </div>
                <button 
                    type="submit" 
                    className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">
                    パスワードリセット申請メールを送る
                </button>
            </form>
        </div>
    );

}




