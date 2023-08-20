import { FC } from "react";
import React, { useState} from 'react';
import axios from "axios";

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
        <div>
            <div>
                { isLoading ? '送信中....' : '' }
            </div>
            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10">
              メール承認
            </h1>
            
            <p>
              <b>{props.email}</b>宛に認証メールを送りました。<br/>
              届いたEメールの認証ボタンもしくはリンクをクリックして<br/>
              アカウントを有効化してください。
            </p>
            <h2>※認証メールが届いてない場合</h2>
            <p>下の"メール再送"ボタンをクリックしてくだい。メールを再送します。</p>
            <form onSubmit={Submit}>
              <button type="submit">メール再送</button>
            </form>
        </div>
      );


}