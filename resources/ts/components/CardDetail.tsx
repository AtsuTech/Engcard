import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteCard } from "./DeleteCard";
import { SoundAction } from "./parts_component/SoundAction";
import { Bage } from "./parts_component/Bage";
import { PageBack } from "./parts_component/PageBack";
import { Card } from "./Card";

export const CardDetail:FC = () => {

    //URLからパラメータを取得
    const { card_id } = useParams();

    var [imgFlag,setImgFlag] = useState<boolean>();

    const [card,setCards] = useState<any>({
        card_id:'',
        word:'',
        word_mean:'',
        sub_word_mean:'',
        img_path:'',
        sentence:'',
        sentence_mean:'',
        memory:'',
        category:'',
        link:'',
        user_id:'',
        flashcard_id:'',
        flashcard_title:'',
        created_at:'',
    });

    //const[message,setMassage] = useState('');

    document.title = '単語:'+card.word;

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/card/' + card_id).then((response) => { 
            console.log(response);

            if(response.data.restriction){
                window.location.href = '/home'
            }else{
                setCards({
                    card_id:response.data.id,
                    word : response.data.word,
                    word_mean : response.data.word_mean,
                    sub_word_mean : response.data.wordmeans,
                    img_path : location.protocol + '//' + window.location.host + '/storage/images/card/'+ response.data.user_id + '/' + response.data.flashcard_id + '/' + response.data.img_path,
                    sentence : response.data.sentence,
                    sentence_mean : response.data.sentence_mean,
                    memory : response.data.memory,
                    category : response.data.category,
                    link : response.data.link,
                    user_id:  response.data.flashcard.user_id,
                    flashcard_id : response.data.flashcard.uuid,
                    flashcard_title:response.data.flashcard.title,
                    created_at: response.data.created_at,
                });

                if(response.data.img_path){
                    setImgFlag(true);
                }
            }

        }).catch((error) => { 
            console.log(error);
        
        });
    },[]);

    const Sound =()=>{
        const msg = new SpeechSynthesisUtterance();
        msg.text = card.word;
        msg.lang = 'en-US';
        msg.rate = 1;

        speechSynthesis.speak(msg);
    }


    const user_id:any = localStorage.getItem('user_id');


    return(
        <div className="p-2 md:p-0">
            <div className="flex items-center /px-4 mt-2 w-48 md:w-full">
                <PageBack />
                <div className="ml-2">
                    <Link to={`/flashcard/${card.flashcard_id}`} className="/truncate line-clamp-1">{card.flashcard_title}</Link>
                </div>
            </div>

            <Card
                date={card.created_at}
                memory={card.memory}
                imgflag={imgFlag}
                img_path={card.img_path}
                word={card.word}
                word_mean={card.word_mean}
                category={card.category}
                sub_word_mean={card.sub_word_mean}
                sentence={card.sentence}
                sentence_mean={card.sentence_mean}
                link={card.link}
            />

            {/* <div className="w-full md:w-96 ml-auto mr-auto text-right text-xs">編集:{card.created_at}</div>
            <div className="w-full md:w-96 ml-auto mr-auto border /border-gray-300 rounded-lg bg-white shadow-2xl overflow-hidden">

                <div className="relative">

                    <div className="absolute top-1 left-1 /border /border-gray-300 rounded-full ">
                        {card.memory?
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="/size-6 w-6 text-gray-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>                        
                            </div>                    
                        :
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="/size-6 w-6 text-amber-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>                        
                            </div>
                        }                        
                    </div>

                    {imgFlag ?
    
                        <div>
                            <div style={{ backgroundImage: `url(${card.img_path})` }} className="/bg-gray-500 bg-cover bg-center w-full h-64 /rounded-lg">
                            </div>     
                            <h2 className="flex p-1 text-3xl items-center justify-center">
                                <div className="flex"> 
                                    <div className="flex items-center justify-center pr-1">
                                        <SoundAction value={card.word} />
                                    </div>
                                    <div className="w-full /ml-2 /bg-green-400">
                                        {card.word}
                                    </div>                                
                                </div> 
                            </h2>                           
                        </div>

                    :
                        <h2 className="flex p-1 h-64 text-3xl items-center justify-center">
                             <div className="flex"> 
                                <div className="flex items-center justify-center pr-1">
                                    <SoundAction value={card.word} />
                                </div>
                                <div className="w-full /ml-2 /bg-green-400">
                                    {card.word}
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
                                {card.category != null && <Bage value={card.category}/> }
                            </div>
                            <div className="ml-1 /text-2xl">{card.word_mean}</div>
                        </div>

                        <hr />

                        {card.sub_word_mean && card.sub_word_mean.length > 0 && 
                            card.sub_word_mean.map((sub_mean: any, index: number) => (
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
                            <p className="py-2">{card.sentence ? <>{card.sentence}</> : "英文はありません"}</p>
                        </div>
                        
                        <div className="text-sm">
                            <div className="">[ 和訳 ]</div>
                            <p className="py-2">{card.sentence_mean ? <>{card.sentence_mean}</> : "和訳はありません"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit">
                    <div className="w-full pl-2 bg-yellow-400">外部リンク</div>
                    <div className="p-2">
                        {card.link != null ?
                            <a href={card.link} className="break-words text-yellow-400 /text-left" target="_blank">{card.link}</a>
                            :
                            <div>リンクはありません</div>
                        }                        
                    </div>

                    
                </div>
                
            </div> */}
            
        </div>
    );
}