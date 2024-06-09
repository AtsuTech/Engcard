import { FC } from "react";
import React, { useState} from 'react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { LoginSuccessDialog } from "../parts_component/LoginSuccessDialog";
import { Button } from "../parts_component/Button";
import { LinkLogo } from "../parts_component/LinkLogo";
import { InputWithValidation } from "../parts_component/InputWithValidation";



export const Login: FC = () => {
    //ページ遷移で使う
    const navigate = useNavigate();

    //ログイン後の移動先
    const JumpLink =()=>{
        navigate('/flashcard/my');
        
    }
    
    const user_name = localStorage.getItem('user_name');
    const message = "ようこそ、" + user_name + "さん。"

    const [open,setOpen] = useState<boolean>(false);

    interface Login {
        email: string;
        password: string;
    }


    // フォーム入力の値の変数を定義
    const [loginInput, setLogin] = useState<Login>({
        email: '',
        password: '',
    });

    const [error,setErroe] = useState({
        email:'',
        password:'',
    });


    // トークンを保存するクッキーを定義
    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);


    // フォーム入力された値をsetLogin関数で更新
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    // フォームのボタンがsubmitされた時に、ログインの処理をする
    const LoginSubmit = (e: any) =>{

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        // axiosで送るデータを定義。ここにフォームで入力された値(email,password)が入る。
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        // axiosでログインAPIにemail,passwordをHTTP通信で送る
        axios.post('/api/login', data).then(function (response:AxiosResponse|any){

            // --------送信成功時の処理-------- //
            //alert('ログイン成功');
            setOpen(true);
            
            
 

            //トークンをクッキーに保存
            setCookie("token",response.data.access_token);

            // props.setAuth(true);

            //ユーザID,ユーザ名,トークン期限をローカルストレージに保存
            localStorage.setItem('user_id',response.data.user_id);
            localStorage.setItem('user_name',response.data.user_name);
            localStorage.setItem('expires_in',response.data.expires_in);

            //ステータスコードをローカルストレージに保存
            localStorage.setItem('auth_status',response.status);

            //ログイン後の移動先
            //window.location.href = '/dashboard';

            
        })
        .catch(function (error:AxiosError|any) {
        
            // --------送信失敗時の処理-------- //
            alert("ログイン失敗");
            setErroe({
                email:error.response.data.email,
                password:error.response.data.password,
            })

        });

    }




    return (
        <div className="block md:w-1/3 ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">
            <LoginSuccessDialog open={open} title="ログイン成功" message={message} func={JumpLink} />

            <div className="w-full mb-4">
                <div className="w-fit ml-auto mr-auto">
                    <LinkLogo link="/" width={120} />  
                </div>                        
            </div>

            <form onSubmit={LoginSubmit}>

                
                <InputWithValidation  
                    label="メールアドレス"  
                    type="email" 
                    value={loginInput.email} 
                    name="email" 
                    func={handleInput} 
                    placeholder="メールアドレス" 
                    error={error.email}
                />

                <InputWithValidation  
                    label="パスワード"  
                    type="password" 
                    value={loginInput.password} 
                    name="password" 
                    func={handleInput} 
                    placeholder="パスワード" 
                    error={""}
                />

                <Button text="ログイン" color="yellow"/>
            </form>

            <Link to="/register" className="">
                <span className="block w-full text-cyan-500 mt-5">新規登録</span>
            </Link>

            <Link to="/password/forgot" className="">
                <span className="block w-full text-cyan-500 mt-5">パスワードを忘れた</span>
            </Link>

        </div>
    );
    
}



