import { FC } from "react";
import React, { useState} from 'react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { RegisterEmailVerify } from "./RegisterEmailVerify";

export const Register: FC = () => {


    // 初期状態(true)の場合、登録情報の入力画面コンポーネントを表示する
    const [ process, setProcess ] = useState<boolean>(true);

    //入力データの型定義
    interface User {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }

    //入力データ変数
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    //API responseデータの型定義
    interface Response {
        message: string;
        email: string;
        error_name: any;
        error_email: string;
        error_password: string;
    }

    //API responseデータ変数
    const [response, setResponse] = useState<Response>({
        message: '',
        email: '',
        error_name: '',
        error_email: '',
        error_password: '',
    });

    //ローディングの状態管理
    const [ isLoading, setIsLoading ] = useState<Boolean>(false);


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setUser({...user, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e:any) => {

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();
        setIsLoading(true);
        
        //axios通信で渡すクエリパラメータ
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        }


        axios.post('/api/register', data).then(function (response: AxiosResponse<Response>) {
            // 送信成功時の処理
            setIsLoading(false);
            console.log(response.data);
            setResponse({
                message: response.data.message,
                email: response.data.email,
                error_name: '',
                error_email: '',
                error_password: '',
            });
 
            setProcess(false);
            
        })
        .catch(function (error:undefined|any) {
            // 送信失敗時の処理
            setIsLoading(false);
            alert('登録に失敗しました。メールアドレス、パスワードをご確認ください');
            setResponse({
                message: '',
                email: '',
                error_name: error.response.data.name,
                error_email: error.response.data.email,
                error_password: error.response.data.password,
            });
                
        });
    }
    return (
        <>
            { process ? 
                <div>
                    <div>
                        { isLoading ? '送信中....' : '' }
                    </div>

                    <h1>新規登録</h1>
                    <form onSubmit={registerSubmit}>

                        <span>名前</span>
                        <span className="block text-red-500">{response.error_name}</span>
                        <input type="text" name="name" value={user.name} onChange={handleInput} className="input_style"/>

                        <span>メールアドレス</span>
                        <span className="block text-red-500">{response.error_email}</span>
                        <input type="email" name="email" value={user.email}  onChange={handleInput} className="input_style"/>

                        <span>パスワード</span>
                        <span className="block text-red-500">{response.error_password}</span>
                        <input type="password" name="password" value={user.password}  onChange={handleInput} className="input_style"/>

                        <span>パスワード(確認でもう一度入力)</span>
                        <input type="password" name="password_confirmation" value={user.password_confirmation}  onChange={handleInput} className="input_style"/>

                        <button type="submit" className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">
                            登録
                        </button>

                    </form>       
                </div>
            :
                <RegisterEmailVerify email={response.email} /> 
            }
        </>

    )

}