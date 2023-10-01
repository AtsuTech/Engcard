import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";

export const UserUpdate:FC = () =>{

    document.title = 'ユーザー情報更新';

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const API_TOKEN = auth_token.token;

    interface Me{
        name:string;
        email:string;
    }

    const [me ,setMe] = useState<Me>({
        name:'',
        email:'',
    });

    const [validation,setValidation] = useState({
        name:'',
        email:'',
    });

    //現在の情報を取得
    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/user',{ headers: { Authorization: "Bearer " + API_TOKEN } }).then((response:AxiosResponse|any) => { 
            console.log(response);
            
            setMe({
                name:response.data.name,
                email:response.data.email,           
            });

        }).catch((error:AxiosError|any) => { 
            // alert('NG');
            console.log(error.response.status);
            localStorage.setItem('auth_status',error.response.status);
        });
    },[]);

    
    const handleInput =(e:any)=> {
        setMe({...me, [e.target.name]: e.target.value});
    }

    //更新ボタン押した時の処理
    const Update =(e:any)=>{

        e.preventDefault();

        const data = {
            name:me.name,
            email:me.email,
        }

        axios.post('/api/user/update',data).then((response:AxiosResponse|any) => { 

            //ユーザー情報更新成功時の処理
            alert(response.data.message);
            localStorage.setItem('user_name',me.name);
            
        }).catch((error:AxiosError|any) => { 

            setValidation({
                name:error.response.data.name,
                email:error.response.data.email,
            })
        });
    }

    return(
        <div>
            <h1 className="text-3xl">ユーザー情報更新</h1>

            <form onSubmit={Update} className="block rounded-3xl bg-white text-slate-600 p-5">

                <span className="text-red-600">{validation.name}</span>
                <input type="text" 
                    name="name" 
                    value={me.name} 
                    onChange={handleInput} 
                    placeholder="名前"
                    className="w-full h-10 mt-5 border border-gray-400 rounded"
                />

                <span className="text-red-600">{validation.email}</span>
                <input type="email" 
                    name="email" 
                    value={me.email}  
                    onChange={handleInput} 
                    placeholder="メールアドレス"
                    className="w-full h-10 mt-5 border border-gray-400 rounded"
                />

                <button type="submit" className="block mr-0 bg-blue-400 w-36 h-10 text-white ml-auto mr-auto rounded-lg font-medium text-1xl m-5">
                    変更
                </button>

            </form>

        </div>
    );

}