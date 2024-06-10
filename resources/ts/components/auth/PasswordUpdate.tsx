import { FC } from "react";
import { useLocation } from 'react-router-dom';
import React, { useState} from 'react';
import axios from 'axios';
import { SettingBreadcrumbs } from "../SettingBreadcrumbs";
import { Title } from "../parts_component/Title";
import { Button } from "../parts_component/Button";



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
        <div className="block rounded-3xl bg-white text-slate-600 p-5">

            <SettingBreadcrumbs current="パスワードの変更" />

            <Title title="パスワードの変更" />

            <form onSubmit={Update}>

                <div className="mt-3">
                    <label htmlFor="">現在のパスワード</label>
                    <input type="password" 
                        name="password_current" 
                        //value={resetPass.email}  
                        onChange={handleInput} 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                    />
                </div>

                <div  className="mt-3">
                    <label htmlFor="">新パスワード</label>
                    <input type="password" 
                        name="password_new" 
                        //value={resetPass.password}  
                        onChange={handleInput} 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                    />
                </div>

                <div  className="mt-3">
                    <label htmlFor="">新パスワード(確認でもう一度入力)</label>
                    <input type="password" 
                        name="password_new_conf" 
                        //value={resetPass.password_confirmation}  
                        onChange={handleInput} 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                    />
                </div>


                {/* <button type="submit" className="block mt-10 bg-gray-800 w-full h-10 text-white ml-auto mr-auto rounded-lg shadow-lg font-medium text-1xl">
                    パスワード再設定
                </button> */}

                <Button text="パスワード再設定" color="yellow" />
            </form>
        </div>
    );




}


