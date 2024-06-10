import { FC } from "react";
import { Link } from 'react-router-dom';


export const SettingBreadcrumbs:FC<{current:any}> = ({current}) =>{

    return(

            <nav className="flex my-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to={'/setting'} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-400 dark:text-gray-400 dark:hover:text-white">
                            設定
                        </Link>
                    </li>

                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{current}</span>
                        </div>
                    </li>

                </ol>
            </nav>
    );
}