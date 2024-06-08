import { FC } from "react";
import { Link } from 'react-router-dom';
import { Title } from "../parts_component/Title";
import { LinkLogo } from "../parts_component/LinkLogo";

export const RegisterComplete: FC = () => {

    function Go(){
        //window.location.href = '/home'
        window.location.href = '/login'
    }

    return (
        <>
            <div className="block xl:w-1/2 sm:w-full ml-auto mr-auto bg-white text-slate-600 p-5">
                <div className="w-full">
                    <div className="w-fit ml-auto mr-auto">
                        <LinkLogo link="/" width={120} />  
                    </div>                        
                </div>

                <div className="absolute inset-0 flex items-center justify-center w-100 h-full">
                    <div>
                        <div className="w-full my-3">
                            <div className="w-fit ml-auto mr-auto">
                                <Title title="アカウントの作成が完了しました！"/>
                            </div>
                        </div>

                        <div className="w-full my-3 mt-10">
                            <div className="w-fit ml-auto mr-auto">
                                <button className="block bg-amber-400 text-slate-700 px-3 w-fit h-12 rounded-full" onClick={Go}>
                                    <div className="flex">
                                        ログインしてはじめる
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>                        
                                    </div>
                                </button>                        
                            </div>
                        </div>                    
                    </div>
                </div>


                



            </div>
        </>

    )

}