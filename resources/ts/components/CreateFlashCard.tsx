import { FC } from "react";
import React from 'react';
import { useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Title } from "./parts_component/Title";
import { Button } from "./parts_component/Button";


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
            {/* <h1 className="text-xs">単語帳を作成</h1> */}
            <form onSubmit={Submit} className="block w-full ml-auto mr-auto mt-10 mb-10 p-5 rounded-3xl bg-white">
                <Title title={'単語帳を作成'} />
                <label className="block w-full mt-4 text-sm">単語帳の名前を入力(後からでも名前を変更できます)</label>
                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg pl-2 /text-2xl" 
                    placeholder="タイトル" 
                    name="title"
                    onChange={TitleInput} 
                    required
                />

                <label className="block w-full mt-6 text-sm">公開ステータス</label>
                <div className="flex w-full h-fit">

                    {accessLists.map( (accessList:any) =>(
                        <div key={accessList.id} className="relative flex w-full ">
                            <input type="radio" name="access" value={accessList.id}
                                onChange={(e:any) => setAccess(e.target.value)} 
                                checked={accessList.id == access} 
                                required
                                className="sr-only peer"
                                id={accessList.id}
                            />

                            <label htmlFor={accessList.id} className="block w-full h-14 pl-2 pt-1 border border-gray-300 rounded-lg mr-1 /leading-7 focus:outline-none peer-checked:border-2 peer-checked:border-yellow-400">
                                {accessList.item}<br/>
                                <small className="text-xs text-gray-400">{accessList.description}</small>
                            </label>

                            <div className="hidden p-2.5 absolute right-0 peer-checked:block">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-amber-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                            </div>
  
                        </div>

                    )) }
                </div>

                <label htmlFor="" className="block w-full mt-6 text-sm">概要(記載は省略できます)</label>
                <textarea id="" cols={30} rows={10} name="description"
                    className="w-full h-32 border border-gray-300 rounded-lg p-2"
                    onChange={DescriptionInput}
                    placeholder="単語帳についての説明など" >
                </textarea>
                    
                <Button color={'yellow'} text={'単語帳を作成'} />

            </form>
        </div>
    );
}

