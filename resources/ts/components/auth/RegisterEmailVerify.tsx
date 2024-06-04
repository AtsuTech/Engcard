import { FC } from "react";
import React, { useState} from 'react';
import axios from "axios";
import { Title } from "../parts_component/Title";
import { ButtonWithOnClick } from "../parts_component/ButtonWithOnClick";

type Props = {
    email: string,
  };


export const RegisterEmailVerify: FC<Props> = (props) => {

    // 初期状態(true)の場合、登録情報の入力画面コンポーネントを表示する
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    function Submit(e: any) {

        e.preventDefault();

        setIsLoading(true);
    
        axios.get('/api/email/resesnd', {params: {email: props.email}}).then(function (response) {

            // 送信成功時の処理
            setIsLoading(false);
            alert('メールを再送しました');
        })
        .catch(function (error) {
            // 送信失敗時の処理
            alert('NG');
            console.log('通信に失敗しました');
        });
    
      }
    
    
      return (
        <div className="block md:w-1/3 w-full ml-auto mr-auto bg-white text-slate-600 p-5 mt-5 ">
            <div>
                { isLoading ? '送信中....' : '' }
            </div>


            <div className="w-full">
                <img src={location.protocol + '//' + window.location.host + "/material/images/brand-logo.png" }
                        alt="logo" 
                        width={120}
                        className="block rounded-lg ml-auto mr-auto" 
                />              
            </div>

            <h1 className="text-2xl text-center font-bold mt-5 mb-3">
                ユーザー登録認証メールを送信しました！
            </h1>
            

            <div className="w-full">
                <img src={location.protocol + '//' + window.location.host + "/material/images/send_email.png" }
                        alt="logo" 
                        width={300}
                        className="block rounded-lg ml-auto mr-auto" 
                />              
            </div>


            {/* <Title title="メール承認"/> */}
            
            <p>
              <b>{props.email}</b>宛に認証メールを送りました。<br/>
              届いたEメールの認証ボタンもしくはリンクをクリックして
              アカウントを有効化してください。
            </p>

            <div className="w-fit block ml-auto mr-auto my-2">
                <p className="text-center mt-7 flex w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                    <span>認証メールが届きませんでした</span>
                </p>                
            </div>

            <p className="text-center my-5">認証メールを再送が必要な場合は下のボタンを押してください。</p>


            {/* <form onSubmit={Submit}>
              <button type="submit">メール再送</button>
            </form> */}

            <div className="w-full flex justify-end">
                <button className="w-fit px-4 h-12 text-white bg-amber-400 rounded-full" onClick={Submit}>再送信</button>
            </div>

            {/* <ButtonWithOnClick text="メール再送" color="yellow" onclick={Submit} /> */}
        </div>
      );


}