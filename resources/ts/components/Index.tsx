import { FC } from "react";
import { Link } from 'react-router-dom';

export const Index: FC = () => {


    return (
        <>
            <div>
                <h1>ガゾタンへようこそ</h1>

                <img src="https://cdn.pixabay.com/photo/2018/02/23/22/04/book-bindings-3176776_1280.jpg" alt="" width={500} />

                <button>
                    <Link to="login">ログイン</Link>
                </button>

                <button>
                    <Link to="register">新規登録</Link>
                </button>

            </div>
        </>

    )

}