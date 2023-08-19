import { FC } from "react";
import axios from "axios";

type Props = {
    email: string,
  };


export const RegisterEmailVerify: FC<Props> = (props) => {

    function Submit(e: any) {

        e.preventDefault();
    
        axios.get('http://127.0.0.1:8000/api/email/resesnd', {params: {email: props.email}}).then(function (response) {
            // 送信成功時の処理
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
            <h1 className="w-full border-b-2 text-center text-2xl mt-10 mb-10">
              メール承認
            </h1>
            
            <p>
              <b>{props.email}</b>にメールを送りました。届いたメールの承認ボタンもしくはリンクをクリックして<br/>
              アカウントを有効化してください。
            </p>
            <form onSubmit={Submit}>
              <button type="submit">メールが届いてない場合はこちらから再送してください</button>
            </form>
        </div>
      );


}