import { FC } from "react"


export const Login: FC = () => {


    return (
        <div >
            <h4>ログイン</h4>

            <label>メールアドレス</label>
            <input type="text" />

            <label>パスワード</label>
            <input type="password" />
        </div>
    )

}