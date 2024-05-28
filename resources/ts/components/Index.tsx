import { FC } from "react";
import { Link } from 'react-router-dom';
import { LinkLogo } from "./parts_component/LinkLogo";

export const Index: FC = () => {


    return (
        <>
            <div className="bg-[url('https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_1280.jpg')] 
                p-20 text-white h-screen"
                >
                
                <LinkLogo link="/" width={160} />  
                <h2 className="text-3xl md:text-5xl mt-4">Engcardで語彙力を高めよう</h2>

                <p className="mt-10">
                    Engcard(エンカード)は英単語の暗記することに機能を特化したweb単語帳です。
                </p>


                <p className="mt-10">
                    アカウントをお持ちの方
                </p>

                <button 
                    className="block mt-10 bg-white border border-yellow-500 
                    w-full h-14 text-yellow-500 ml-auto mr-auto rounded-full 
                    shadow-lg font-medium text-2xl"
                    >
                    <Link to="login" className="block w-full">ログイン</Link>
                </button>

                <button 
                    className="block mt-10 bg-yellow-500 border border-white 
                    w-full h-14 text-white ml-auto mr-auto rounded-full 
                    shadow-lg font-medium text-2xl"
                    >
                    <Link to="register" className="block w-full">はじめる</Link>
                </button>

            </div>
        </>

    )

}