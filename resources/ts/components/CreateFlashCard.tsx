import { FC } from "react";
import React from 'react';
import { useState, useEffect} from "react";
import axios from 'axios';



export const CreateFlashCard:FC = () =>{

    document.title = '単語帳作成';

    const [title, setTitle] =useState<string>('');
    const [access, setAccess] = useState<number>(1);

    const [form ,setForm] = useState({
        title : '',
        access : access,
        user_id : localStorage.getItem('user_id'),
    });

    //フォーム入力された値をsetForm関数で更新
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();

        setTitle(e.target.value);

    }
    console.log(title);
    console.log(access);

    // フォームのボタンがsubmitされた時に、ログインの処理をする
    const Submit = (e :any) =>{

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        // axiosで送るデータを定義。ここにフォームで入力された値(email,password)が入る。
        const data = {
            title : title,
            access : access,
            user_id : localStorage.getItem('user_id'),
        }

        // axiosでログインAPIにemail,passwordをHTTP通信で送る
        axios.post('/api/flashcard/create', data).then(function (response) {

            // --------送信成功時の処理-------- //
            alert('作成しました');
        
            // navigate("/home");
            // location.reload();
            
        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);
            console.log(error);

        });

    }


    return(
        <div className="block w-1/3 ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white text-slate-600">
            <h1>単語帳作成</h1>
            <form onSubmit={Submit}>
                <input type="text" className="w-full h-10 border border-gray-300 rounded pl-2" placeholder="タイトル" 
                    name="title"
                    onChange={handleInput} 
                    required
                />

                <div>
                    <input type="radio" name="access" value={0}
                        onChange={(e:any) => setAccess(e.target.value)} required />
                    <label htmlFor="access">公開 <br/>他のユーザーに公開します</label>
                </div>
                
                
                <div>
                    <input type="radio" name="access" value={1}
                        onChange={(e:any) => setAccess(e.target.value)} required />
                    <label htmlFor="access">非公開 <br/>あなただけが閲覧できます</label>
                </div>
                

                
                <button type="submit" className="block mr-0 bg-emerald-400 w-14 h-10 text-white ml-auto mr-auto rounded-lg font-medium text-1xl">作成</button>
            </form>
        </div>
    );
}

