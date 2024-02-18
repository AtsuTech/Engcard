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
        <div className="block xl:w-1/2 sm:w-full ml-auto mr-auto bg-white text-slate-600 p-5 mt-5 ">
            <div>
                { isLoading ? '送信中....' : '' }
            </div>

            <Title title="メール承認"/>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400 w-32 h-32">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>

            
            <p>
              <b>{props.email}</b>宛に認証メールを送りました。<br/>
              届いたEメールの認証ボタンもしくはリンクをクリックして<br/>
              アカウントを有効化してください。
            </p>

            <hr className="mt-5 mb-5"/>
            <p className="text-center mb-3">※認証メールが届いてない場合</p>
            <p>下の"メール再送"ボタンをクリックしてくだい。メールを再送します。</p>
            <form onSubmit={Submit}>
              <button type="submit">メール再送</button>
            </form>

            <ButtonWithOnClick text="メール再送" color="yellow" onclick={Submit} />
        </div>
      );


}