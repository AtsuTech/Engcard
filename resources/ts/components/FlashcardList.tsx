import { FC } from "react";
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
//import { FlashcardFavorite } from "./FlashcardFavorite";



export const FlashcardList:FC<{id:any,uuid:any,title:any,description:any,date:any,length:any,favorite:any,user_id:any,user_name:any,user_img:any}> = 
    ({id,uuid,title,description,date,length,favorite,user_id,user_name,user_img}) =>{
    return(
        <Link to={`/flashcard/${uuid}`} className="block w-full /drop-shadow-md /overflow-hidden hover:drop-shadow-md" >
            <div className="block w-full h-fit border border-gray-300 rounded-lg /overflow-hidden">

                <div className="relative flex p-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <div className="absolute right-2 /w-32 /py-2 text-center /bg-blue-500 text-xs">
                        編集:{date}
                    </div>
                </div>
            
                <div className="px-4 h-12 flex items-center">
                    <div className="w-full">
                        <h5 className="w-full text-xl font-bold line-clamp-1">{title}</h5>
                        {description &&
                            <div className="w-full line-clamp-1 mt-1 text-xs">
                                <p>
                                    {description}
                                </p>
                            </div>
                        }
                    </div>
                </div>
                    
                <div className="relative h-10 px-2 text-xs">
                    <div className="absolute flex right-2 mt-1">

                        <div className="w-fit /px-2 py-2 text-center /bg-amber-500 text-xs">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400 pr-0.5">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                                {favorite}
                            </div>
                        </div>

                        <div className="py-2 px-2">
                            <div className="flex w-fit px-2 /py-1 text-xs rounded-full bg-gray-200">{length}枚</div>
                        </div>

                        {/*  */}

                        <div className="flex w-fit /bg-rose-500">
                            <div className="py-2">
                                <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + user_img} 
                                    className="block w-4 rounded-full border border-gray-400" 
                                />                            
                            </div>
                            <div className="pl-0.5 py-2 truncate">{user_name}</div>
                        </div>                        
                    </div>


                </div>
                
            
            </div>
        </Link>
    );
}