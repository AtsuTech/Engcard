import { FC } from "react";
import { Link } from 'react-router-dom';


export const FlashcardBreadcrumbs:FC<{current:any,user:any}> = ({current,user}) =>{

    const auth:any = localStorage.getItem('user_id');

    return(
        <>
            {auth == user &&
            <nav className="flex my-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to={'/flashcard/my'} className="inline-flex items-center text-sm /px-1 font-medium whitespace-nowrap text-gray-700 hover:text-amber-400 dark:text-gray-400 dark:hover:text-white">
                            単語帳
                        </Link>
                    </li>

                    <li aria-current="page" className="w-full">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="w-48 md:w-full ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 line-clamp-1 /truncate">{current}</span>
                        </div>
                    </li>

                </ol>
            </nav>
            }        
        </>
    );
}