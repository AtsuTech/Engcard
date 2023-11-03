import { FC } from "react";
import React from 'react';
import { useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const CreateFlashCard:FC = () =>{

    document.title = '単語帳作成';

    //ページ遷移で使用
    const navigate = useNavigate();

    const [title, setTitle] =useState<string>('');
    const [access, setAccess] = useState<any>(1);
    const [accessLists, setAccessLists] = useState<any>([]);
    const [description, setDescription] = useState<string>('');

    useEffect(()=>{
        // axiosでログインAPIにemail,passwordをHTTP通信で送る
        axios.get('/api/accesses').then(function (response) {

            // --------送信成功時の処理-------- //
            console.log(response.data);
            setAccessLists(response.data);
            
        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);

        });
    },[]);



    //フォーム入力された値をsetForm関数で更新
    const TitleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();
        setTitle(e.target.value);
    }

    //フォーム入力された値をsetForm関数で更新
    const DescriptionInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {

        //イベントハンドラが実行された後にオブジェクトのプロパティにアクセスする必要がある場合は、e.persist() を呼ぶ必要がある
        e.persist();
        setDescription(e.target.value);
    }
    

    // フォームのボタンがsubmitされた時に、ログインの処理をする
    const Submit = (e :any) =>{

        //フォームデータ送信時に画面を再更新しないようにする処理
        e.preventDefault();

        // axiosで送るデータを定義。ここにフォームで入力された値(email,password)が入る。
        const params = {
            title : title,
            access_id : access,
            description : description,
            user_id : localStorage.getItem('user_id'),
        }

        // axiosでログインAPIにemail,passwordをHTTP通信で送る
        axios.post('/api/flashcard/create', params).then(function (response) {

            // --------送信成功時の処理-------- //
            alert('作成しました');
            navigate('/flashcard/update/'+response.data.id);
            
        })
        .catch(function (error) {
        
            // --------送信失敗時の処理-------- //
            alert(error);
            console.log(error);

        });

    }


    return(
        <div>
            <h1 className="text-3xl">単語帳を作成</h1>
            <form onSubmit={Submit} className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white">
                <h1 className="text-3xl mb-3">単語帳を作成</h1>

                <label className="block w-full mt-4">単語帳の名前を入力(後からでも名前を変更できます)</label>
                <input type="text" className="w-full h-14 border border-gray-300 rounded pl-4 text-2xl" placeholder="タイトル" 
                    name="title"
                    onChange={TitleInput} 
                    required
                />

                <label className="block w-full mt-4">公開ステータス</label>
                <div className="flex w-full h-fit">

                    {accessLists.map( (accessList:any) =>(
                        <div key={accessList.id} className="flex w-full h-14 border border-gray-300 rounded pl-4 ml-1">
                            <input type="radio" name="access" value={accessList.id}
                                onChange={(e:any) => setAccess(e.target.value)} 
                                checked={accessList.id == access} 
                                required
                                className="sr-only peer"
                                id={accessList.id}
                            />

                            <label htmlFor={accessList.id} className="block w-full leading-7 /text-center focus:outline-none peer-checked:/bg-yellow-400">
                            {accessList.type}{accessList.item}<br/>あなただけが閲覧できます
                            </label>
                            <div className="hidden p-4 peer-checked:block">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>

                        </div>

                    )) }
                </div>

                <label htmlFor="">説明</label>
                <textarea id="" cols={30} rows={10} name="description"
                    className="w-full h-32 border border-gray-300 rounded pl-4"
                    onChange={DescriptionInput}>
                </textarea>
                    
                
                <button type="submit" className="block mr-0 bg-yellow-400 w-full h-10 text-white mt-4 ml-auto mr-auto rounded-full font-medium text-1xl">
                    単語帳を作成
                </button>
            </form>
        </div>
    );
}

