import { FC } from "react";
import { useLocation } from 'react-router-dom';
import React, { useState} from 'react';
import axios from 'axios';



export const PasswordUpdate: FC = () => {

    document.title = 'パスワードの変更';

    interface password {
        password_current : string;
        password_new : string;
        password_new_conf : string;
    }

    const [pass, setPass] = useState<password>({
        password_current :'',
        password_new :'',
        password_new_conf :'',
    });


    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setPass({...pass, [e.target.name]: e.target.value });
    }

    const Update = (e:any) => {

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        const params = {
            password_current :pass.password_current,
            password_new :pass.password_new,
            password_new_conf :pass.password_new_conf,
        }

        axios.post('/api/user/password/update', params).then(function (response) {
            // 送信成功時の処理
            alert(response.data.message);
            //window.location.href = '/login';
            
        })
        .catch(function (error) {
            // 送信失敗時の処理
            //alert('パスワード変更に失敗しました');


        });

    }

    return(
        <div className="w-96 ml-auto mr-auto">

            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10 font-bold">パスワードの変更</h1>

            <form onSubmit={Update}>

                <div>
                    <p>現在のパスワード</p>
                    <input type="password" 
                        name="password_current" 
                        //value={resetPass.email}  
                        onChange={handleInput} 
                        className="block w-full h-10 border border-gray-600 rounded pl-2"
                    />
                </div>

                <div>
                    <p>新パスワード</p>
                    <input type="password" 
                        name="password_new" 
                        //value={resetPass.password}  
                        onChange={handleInput} 
                        className="block w-full h-10 border border-gray-600 rounded pl-2"
                    />
                </div>

                <div>
                    <p>新パスワード(確認でもう一度入力)</p>
                    <input type="password" 
                        name="password_new_conf" 
                        //value={resetPass.password_confirmation}  
                        onChange={handleInput} 
                        className="block w-full h-10 border border-gray-600 rounded pl-2"
                    />
                </div>


                <button type="submit" className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">
                    パスワード再設定
                </button>
            </form>
        </div>
    );




}


