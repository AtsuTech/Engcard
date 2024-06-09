import { FC } from "react";
import React, { useState} from 'react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { RegisterEmailVerify } from "./RegisterEmailVerify";
import {Link,useNavigate} from 'react-router-dom';
import { InputRoundedGray } from "../parts_component/InputRoudedGray";
import { Button } from "../parts_component/Button";
import { LinkLogo } from "../parts_component/LinkLogo";

export const Register: FC = () => {

    document.title = "新規登録";


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
            console.log(error);
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
                <div className="block md:w-1/3 ml-auto mr-auto mt-2 mb-10 p-5 rounded-3xl bg-white text-slate-600">
                    <div>
                        { isLoading ? '送信中....' : '' }
                    </div>

                    <div className="w-full">
                        <div className="w-fit ml-auto mr-auto">
                            <LinkLogo link="/" width={120} />  
                        </div>                        
                    </div>
                    
                    {/* <h1 className="w-full text-center text-2xl mt-10 mb-5">新規登録</h1> */}
                    <form onSubmit={registerSubmit}>


                        <InputRoundedGray  
                            label="名前"  
                            type="text" 
                            value={user.name} 
                            name="name" 
                            func={handleInput} 
                            placeholder="名前" 
                            error={response.error_name}
                        />


                        <InputRoundedGray  
                            label="メールアドレス"  
                            type="email" 
                            value={user.email} 
                            name="email" 
                            func={handleInput} 
                            placeholder="メールアドレス" 
                            error={response.error_email}
                        />


                        <InputRoundedGray  
                            label="パスワード"  
                            type="password" 
                            value={user.password} 
                            name="password" 
                            func={handleInput} 
                            placeholder="パスワード" 
                            error={response.error_password}
                        />



                        <InputRoundedGray  
                            label="パスワード(確認でもう一度入力)"  
                            type="password" 
                            value={user.password_confirmation} 
                            name="password_confirmation" 
                            func={handleInput} 
                            placeholder="パスワード(確認でもう一度入力)" 
                            error={response.error_password}
                        />

                        <Button text="登録" color="yellow"/>

                    </form> 

                    <Link to="/login" className="">
                        <span className="block w-full text-cyan-500 mt-5">ログイン</span>
                    </Link>

                    <Link to="/password/forgot" className="">
                        <span className="block w-full text-cyan-500 mt-5">パスワードを忘れた</span>
                    </Link>      
                </div>
            :
                <RegisterEmailVerify email={response.email} /> 
            }
        </>

    )

}