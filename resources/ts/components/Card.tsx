import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteCard } from "./DeleteCard";
import { SoundAction } from "./parts_component/SoundAction";
import { Bage } from "./parts_component/Bage";
import { PageBack } from "./parts_component/PageBack";


export const Card:FC<{date:any,memory:any,imgflag:any,img_path:any,word:any,word_mean:any,category:any,sub_word_mean:any,sentence:any,sentence_mean:any,link:any}> = ({
    date,memory,imgflag,img_path,word,word_mean,category,sub_word_mean,sentence,sentence_mean,link}) => {
    return(
        <>
            {/* <div className="w-full md:w-96 ml-auto mr-auto text-right text-xs">編集:{date}</div> */}
            <div className="w-full md:w-96 ml-auto mr-auto border /border-gray-300 rounded-lg bg-white /shadow-2xl overflow-hidden">

                <div className="relative">

                    <div className="absolute top-1 left-1 /border /border-gray-300 rounded-full ">
                        {memory?
                           <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="/size-6 w-6 text-amber-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>                        
                            </div>                              
                        :
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="/size-6 w-6 text-gray-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>                        
                            </div>       
                        }                        
                    </div>

                    {imgflag ?
    
                        <div>
                            <div style={{ backgroundImage: `url(${img_path})` }} className="bg-cover bg-center w-full h-36 md:h-64 /rounded-lg">
                            </div>     
                            <h2 className="flex p-1 text-2xl md:text-3xl items-center justify-center">
                                <div className="flex"> 
                                    <div className="flex items-center justify-center pr-1">
                                        <SoundAction value={word} />
                                    </div>
                                    <div className="w-full text-wrap">
                                        {word}
                                    </div>                                
                                </div> 
                            </h2>                           
                        </div>


                    :
                        <h2 className="flex p-1 h-36 md:h-64 text-2xl md:text-3xl items-center justify-center">
                             <div className="flex"> 
                                <div className="flex items-center justify-center pr-1">
                                    <SoundAction value={word} />
                                </div>
                                <div className="w-full /ml-2 /bg-green-400">
                                    {word}
                                </div>                                
                            </div> 
                        </h2>                  
                    }
                </div>

                <div className="w-full h-fit">
                    <div className="w-full pl-2 bg-yellow-400">意味</div>

                    <div className="/text-3xl px-2">

                        <div className="flex items-center py-1">
                            <div className="">
                                {category != null && <Bage value={category}/> }
                            </div>
                            <div className="ml-1 /text-2xl">{word_mean}</div>
                        </div>

                        <hr />

                        {/* サブの意味 */}
                        {sub_word_mean && sub_word_mean.length > 0 && 
                            sub_word_mean.map((sub_mean: any, index: number) => (
                                <div key={index}>
                                    <div className="flex items-center py-1 /border-b /border-b-gray-300">
                                        <div className="">
                                            {sub_mean.category != null && <Bage value={sub_mean.category}/> }
                                        </div>
                                        <div className="ml-1 /text-2xl">{sub_mean.word_mean}</div>
                                    </div>
                                    <hr />                                
                                </div>

                            ))
                        }

                    </div>
                </div>

                <div className="w-full h-fit">
                    <div className="w-full pl-2 bg-yellow-400">例文</div>
                    <div className="px-2 divide-y divide-dashed divide-yellow-400">
                        
                        <div className="text-sm">
                            <div className="">[ 英文 ]</div>
                            <p className="py-2">{sentence ? <>{sentence}</> : "英文はありません"}</p>
                        </div>
                        
                        <div className="text-sm">
                            <div className="">[ 和訳 ]</div>
                            <p className="py-2">{sentence_mean ? <>{sentence_mean}</> : "和訳はありません"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit">
                    <div className="w-full pl-2 bg-yellow-400">外部リンク</div>
                    <div className="p-2">
                        {link != null ?
                            <a href={link} className="break-words text-yellow-400 /text-left" target="_blank">{link}</a>
                            :
                            <div>リンクはありません</div>
                        }                        
                    </div>

                    
                </div>
                
            </div>
            
        </>
    );
}