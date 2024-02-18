import { FC } from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useState, useEffect, useContext } from "react";
import { Title } from "../parts_component/Title";
import { ProfileImage } from "../ProfileImage";
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

    const [user_id_check,setUserIdCheck] = useState<boolean>(true);

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

    
    const CheckUserId =(e:any)=>{


        
    }

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/user/personal_id/check/' + me.personal_id).then((response:AxiosResponse|any) => { 

            setUserIdCheck(response.data.result);
            
        }).catch((error:AxiosError|any) => { 
            // alert('NG');
            console.log(error);
        });
    },[me.personal_id]);

    
    const handleInput =(e:any)=> {
        setMe({...me, [e.target.name]: e.target.value});
    }

    const ProfileImageDelete:FC = () =>{

        const Delete =()=>{

            const confirm = window.confirm("削除しますが本当によろしいですか？");

            if(confirm){
                axios.post('/api/user/profile/image/delete').then((response:AxiosResponse|any) => { 

                    //成功時の処理
                    alert('プロフィール画像を削除しました');
                    
                }).catch((error:AxiosError|any) => { 

                    alert('通信エラーが発生しました');
                });
            }

        }

        return(
            <button className="w-fit h-10 p-1 px-2 bg-gray-400 text-white rounded-md" onClick={Delete}>削除</button>
        );

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

            <div>プロフィール画像</div>
            <div className="flex w-full p-2 border border-gray-300 rounded-lg" >
                <ProfileImage width={80} height={80} />
                <div className="flex items-center justify-center ">
                    <div className="ml-3">
                        <ProfileImageUpload />
                    </div>
                    <div className="ml-3">
                        <ProfileImageDelete />
                    </div>
                </div>
            </div>


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

                <label htmlFor="">ユーザーID{me.personal_id}  </label>
                <input type="text" 
                    name="personal_id" 
                    value={me.personal_id}  
                    onChange={handleInput} 
                    onFocus={CheckUserId}
                    placeholder="ユーザーID"
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                />
                <div>
                    {user_id_check ?
                        <span className="text-green-300">このユーザーIDは使用可能です</span>
                    :
                        <span className="text-rose-600">このユーザーIDは他のユーザーが使用しているので使えません</span>
                    }  
                </div>


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

                <ButtonWithOnClick onclick={Update} color="yellow" text="保存" />

            </form>

        </div>
    );

}