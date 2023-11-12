import { FC } from "react";
import {Link,useNavigate} from 'react-router-dom';

export const Dialog:FC<{open:boolean,title:string,message:string,func:any}> = ({open,title,message,func}) =>{

    const modal = document.getElementById("modal") as any;

    console.log(modal);
    if(open){
        modal.showModal();
    }

    return(
        <div>
            <dialog 
                
                // open={open}
                className="w-96 h-30 ml-auto mr-auto bg-white p-5 shadow-lg rounded-2xl text-slate-500 border border-slate-300"
                id="modal"
            >
                <h1 className="text-center text-2xl">
                    {title}
                </h1>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 ml-auto mr-auto text-green-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <p className="text-center">{message}</p>

                <button 
                    className="block text-center m-auto mr-0 w-20 bg-cyan-500 text-white pt-2 pb-2 rounded-lg"
                    onClick={func}
                >
                確認
                </button>

                
            </dialog>

        </div>
    );

    
}