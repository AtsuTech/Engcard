import { FC } from "react";
import { Link } from 'react-router-dom';
import { LinkLogo } from "./parts_component/LinkLogo";
import { Card } from "./Card";

export const Index: FC = () => {


    return (
        <>
            <div className="bg-[url('https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_1280.jpg')] 
                bg-no-repeat bg-cover p-2 pt-20 md:p-20 h-screen"
                >

                <div className="md:flex">

                    <div className="w-full md:w-1/2 mr-2 text-white /bg-slate-300">

                        <div className="w-full"> 
                            <div className="w-fit md:ml-0 ml-auto mr-auto">
                                <LinkLogo link="/" width={160} />
                            </div>
                        </div>

                        <div className="my-10 md:my-20">
                            <h2 className="text-3xl text-center md:text-left md:text-5xl my-5">英単語を暗記しよう</h2>

                            <p className="my-5">
                                Engcard(エンカード)は英単語暗記に機能特化したweb単語帳です。<br />
                                web上であなただけのオリジナルの英単語帳を作成しましょう。
                            </p>                            
                        </div>
                    
                        <div className="w-full /md:w-1/2">

                            <button 
                                className="block mt-10 bg-yellow-500 border border-white 
                                w-full h-14 text-white ml-auto mr-auto rounded-full 
                                shadow-lg font-medium md:text-2xl"
                                >
                                <Link to="register" className="block w-full">アカウント作成</Link>
                            </button>

                            <div className="flex w-full items-center my-5">
                                <div className="w-1/3 h-0.5 bg-white mr-auto"></div>
                                <p className="w-fit text-wrap px-2 text-center text-sm">
                                    アカウントをお持ちですか？
                                </p>
                                <div className="w-1/3 h-0.5 bg-white ml-auto"></div>
                            </div>

                            <button 
                                className="block /mt-10 bg-white border border-yellow-500 
                                w-full h-14 text-yellow-500 ml-auto mr-auto rounded-full 
                                shadow-lg font-medium md:text-2xl"
                                >
                                <Link to="login" className="block w-full">ログイン</Link>
                            </button>
                           
                        </div>

                    </div>

                    <div className="w-1/2 /text-slate-900 hidden md:block">

                        <div className="w-fit ml-auto mr-auto">
                            <Card
                                date=""
                                memory={true}
                                imgflag={true}
                                img_path={"https://cdn.pixabay.com/photo/2018/08/02/21/51/apples-3580560_1280.jpg"}
                                word="apple"
                                word_mean="りんご"
                                category="名詞"
                                sub_word_mean={""}
                                sentence={""}
                                sentence_mean={""}
                                link={""}
                            />                            
                        </div>

                    </div>

                </div>
                
            </div>

        </>

    )

}