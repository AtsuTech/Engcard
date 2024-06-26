import { FC } from "react";
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { Bage } from "./parts_component/Bage";


export const CardList:FC<{id:any,uuid:any,memory:any,word:any,word_mean:any,category:any,user_id:any,flashcard_id:any,img_path:any}
    > = ({id,uuid,memory,word,word_mean,category,user_id,flashcard_id,img_path}) =>{
    return(
        <>
            <Link to={`/card/${uuid}`} key={id} className="w-full">
                <div key={id} className="flex h-12 border bg-white border-gray-300 mb-3 /px-2 rounded-lg">

                    {/* left */}
                    <div className="relative flex items-center w-1/2 border-r border-gray-300">

                        <div className="w-4 h-full">
                        <div className="flex w-4 h-full items-center justify-center border-r border-gray-300">
                            <div className={`w-2 h-2  rounded-full ${memory ? 'bg-amber-400' : 'bg-gray-400'}`}>
                            </div>
                        </div>                            
                        </div>


                        <p className="w-full pl-2 truncate">
                            {word}
                        </p>

                        {img_path &&
                            <div className="w-16 md:w-12 mr-1">
                                <img src={location.protocol + '//' + window.location.host + '/storage/images/card/'+ user_id + '/' + flashcard_id + '/' + img_path} alt="" className="block w-full h-10 rounded-lg" />   
                            </div>
                        }   


                    </div>

                    {/* right */}
                    <div className="/bg-green-400 w-1/2 h-12 flex items-center">
                        <p className="ml-2 line-clamp-1 /truncate">
                            {category != null &&
                                <Bage value={category} />
                            }
                            {word_mean}
                        </p>
                    </div>

                </div>
            </Link>
        </>
    );
}