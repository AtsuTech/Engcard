import { FC } from "react";
import React, { useState} from 'react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { LinkLogo } from "../parts_component/LinkLogo";
import { Loading } from "../parts_component/Loading";

export const PasswordForgot: FC = () => {

    document.title = "パスワードリセット";

    const [email, setEmail] = useState<string>("");
    const [loading,setLoading] = useState(false);

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setEmail(e.target.value);
    }


    const ResetSubmit = (e:any) =>{
        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();
        setLoading(true);

        const params = {
            email: email,
        }

        
      
        axios.post('http://127.0.0.1:8000/api/password/forgot', params).then(function (response) {
            // 送信成功時の処理
            setLoading(false);
            alert('メール送信成功');

        })
        .catch(function (error) {
            // 送信失敗時の処理
            setLoading(false);
            alert('通信に失敗しました');
        });

    }

    return (
        <div className="block md:w-1/3 ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">

            <div className="w-full mb-4">
                <div className="w-fit ml-auto mr-auto">
                    <LinkLogo link="/" width={120} />  
                </div>                        
            </div>

            <h1 className="w-full /text-center text-2xl mt-10 mb-10">パスワードをリセットする</h1>

            <p className="mb-10">
                パスワードリセットの申請メールを送信します。<br/>
                あなたのメールアドレスを入力し送信ボタンを押して下さい。
            </p>


            <form >
                <div>
                    <label>メールアドレス</label>
                    <input type="email" name="email" value={email}  
                        onChange={handleInput} 
                        className="block w-full pl-4 h-10 border bg-gray-200 rounded-full"
                        placeholder="example@mail.com"
                    />
                </div>
                <div className="mt-10">

                    <button 
                        type="submit" 
                        className="block w-full p-2 text-white ml-auto mr-auto rounded-full font-medium text-lg bg-amber-400"                        
                        onClick={ResetSubmit}>
                            { loading ?  
                                <Loading /> 
                            : 
                                <span>メール送信</span>
                            }
                    </button>   
              
                </div>

            </form>
        </div>
    );

}




