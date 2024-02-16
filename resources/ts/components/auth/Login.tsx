import { FC } from "react";
import React, { useState} from 'react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Dialog } from "../parts_component/Dialog";




const TextInput:FC<{label:any,htmlFor:any,type:any,name:any,value:any,placeholder:any,func:any}> = ({label,htmlFor,type,name,value,placeholder,func}) =>{
    return(
        <>
            <label htmlFor={htmlFor}>{label}</label>
                <input 
                    id={htmlFor}
                    type={type} 
                    name={name}
                    value={value}  
                    onChange={func} 
                    className="block w-full pl-3 h-10 border bg-gray-200 rounded-full"
                    placeholder={placeholder}
                />
        </>
    );
}


export const Login: FC = () => {
    //ページ遷移で使う
    const navigate = useNavigate();

    const JumpLink =()=>{
        navigate('/dashboard');
        
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
            alert(error.response.data.error);
            //alert(error);
            console.log(error);

        });

    }




    return (
        <div className="block w-1/3 ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">
            <Dialog open={open} title="ログイン成功" message={message} func={JumpLink} />
            <h1 className="w-full text-center text-2xl mt-10 mb-10">ログイン</h1>

            <form onSubmit={LoginSubmit}>
                <div>
                    <p>メールアドレス</p>
                    <input type="email" name="email" 
                        value={loginInput.email}  
                        onChange={handleInput} 
                        className="block w-full pl-3 h-10 border bg-gray-200 rounded-full"
                        placeholder="メールアドレス"
                    />
                </div>
                {/* <div className="mt-10">
                    <p>パスワード</p>
                    <input type="password" name="password" 
                        value={loginInput.password}  
                        onChange={handleInput}
                        className="w-full h-10 border border-gray-600 rounded"
                        placeholder="パスワード"
                    />
                </div> */}
                <TextInput  htmlFor="pass" label="パスワード"  type="password" value={loginInput.password} name="password" func={handleInput} placeholder="パスワード" />
                <button type="submit" className="block mt-10 bg-amber-400 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">ログイン</button>
            </form>

            <Link to="/register" className="">
                <span className="block w-full text-cyan-500 mt-10">新規登録</span>
            </Link>

            <Link to="/password/forgot" className="">
                <span className="block w-full text-cyan-500 mt-10">パスワードを忘れた</span>
            </Link>

        </div>
    );
    
}



