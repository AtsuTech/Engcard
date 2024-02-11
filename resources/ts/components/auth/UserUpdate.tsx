import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { Title } from "../parts_component/Title";
import { ProfileImageUpload } from "../ProfileImageUpload";
import { ButtonWithOnClick } from "../parts_component/ButtonWithOnClick";

export const UserUpdate:FC = () =>{

    document.title = 'ユーザー情報更新';

    const [auth_token, setCookie, removeCookie] = useCookies(["token"]);
    const API_TOKEN = auth_token.token;

    interface Me{
        name:string;
        email:string;
        personal_id:string;
        comment:string,
    }

    const [me ,setMe] = useState<Me>({
        name:'',
        email:'',
        personal_id:'',
        comment:'',
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
                personal_id:response.data.personal_id,        
                comment:response.data.comment,
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
            personal_id:me.personal_id,
            comment:me.comment,
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
        <div className="block rounded-3xl bg-white text-slate-600 p-5">
            <Title title="ユーザー情報更新" />

            <ProfileImageUpload />

            <form>

                <label htmlFor="">ユーザー名</label>
                <input type="text" 
                    name="name" 
                    value={me.name} 
                    onChange={handleInput} 
                    placeholder="名前"
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                />
                <span className="text-red-600">{validation.name}</span>

                <label htmlFor="">メールアドレス</label>
                <input type="email" 
                    name="email" 
                    value={me.email}  
                    onChange={handleInput} 
                    placeholder="メールアドレス"
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                />
                <span className="text-red-600">{validation.email}</span>

                <label htmlFor="">ユーザーID</label>
                <input type="text" 
                    name="personal_id" 
                    value={me.personal_id}  
                    onChange={handleInput} 
                    placeholder="ユーザーID"
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                />

                <label htmlFor="">紹介文</label>
                <textarea 
                    name="comment" 
                    id="" 
                    cols={30} 
                    rows={10}
                    value={me.comment}  
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    onChange={handleInput} 
                >

                </textarea>

                <ButtonWithOnClick onclick={Update} color="yellow" text="変更" />

            </form>

        </div>
    );

}