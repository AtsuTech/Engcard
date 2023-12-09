import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect,useRef} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BageDark } from "./parts_component/BageDark";
import { FlashcardFavorite } from "./FlashcardFavorite";

export const FlashCard:FC = () =>{

    

    //URLからパラメータを取得
    const { flashcard_id } = useParams();

    //const[notFonund,setNotFonund] = useState(false);
    //var Id = 0;

    


    interface flashcard{
        id:any,
        title:any,
        description:any,
        created_at:any,
        updated_at:any,
        user_name:any,
        user_id:any,
        profile_icon_img:any,
    }

    const [flashcard,setFlashcard] = useState<flashcard>({
        id:'',
        title:'',
        description:'',
        created_at:'',
        updated_at:'',
        user_name:'',
        user_id:'',
        profile_icon_img:'',
    });

    document.title = "単語帳:"+flashcard.title;

    const [cards,setCards] = useState([]);

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/flashcard/' + flashcard_id).then((response) => { 

            //console.log(response.data);
            // Id = 1;
            
            setFlashcard({
                id:response.data.id,
                title:response.data.title,
                description:response.data.description,
                created_at:response.data.created_at,
                updated_at:response.data.updated_at,
                user_name:response.data.user.name,
                user_id:response.data.user.id,
                profile_icon_img:response.data.user.profile_icon_img,
            });

            

            setCards(response.data.cards);

        }).catch((error) => { 
            console.log(error);
            //setNotFonund(true);
        });
    },[]);


    //console.log(typeof flashcard.id)
    const id = Number(flashcard.id);

    return(
        <>         
            <div>
               
                {/* <div>単語帳:{flashcard.title}</div> */}
                
                <div className="w-full h-fit /border /border-gray-300 rounded-lg p-3 bg-white">

                    <div className="flex text-right text-xs mb-2">
                        <small className="flex">
                            投稿:
                            <div className="pt-1">
                            {flashcard.profile_icon_img != null && <img src={'/storage/images/profile/' + flashcard.profile_icon_img} width={10} height={10} alt="" className="rounded-full mr-1" />}
                            {flashcard.profile_icon_img == null && <img src={'/storage/images/profile/'} width={17} height={17} alt="" className="block rounded-full mr-1" />}
                            </div>
                            {flashcard.user_name}
                        </small>
                        <small className="ml-2">{flashcard.created_at}</small>
                    </div>

                    <div className="w-full h-fit border-2 border-yellow-400 mb-5 rounded-lg">

                        <div className="w-full h-10 pl-2 pt-1 bg-yellow-400 text-sm">

                            <div className="flex w-20 h-hit py-1 items-center justify-center rounded-full bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                単語帳
                            </div>

                        </div>

                        <div className="p-2">
                            <h5 className="text-2xl mb-2">{flashcard.title}</h5>
                        </div>

                    </div>


                    <div className="text-xs">この単語帳の説明</div>
                    <p className="w-full h-32 p-2 text-xs border border-gray-300 rounded-lg">
                        {flashcard.description}
                    </p>

                    <FlashcardFavorite id={flashcard_id} />

                    <div className="flex">
                        
                        <button className="w-full h-fit m-1 p-4 bg-yellow-400 rounded-full">
                            <Link to={`/memory/${flashcard_id}`} className="block w-full h-fit">
                            暗記する
                            </Link>
                        </button>
                        

                        <button className="w-full h-fit m-1 p-4 bg-yellow-400 rounded-full">
                            <Link to={`/quiz/${flashcard_id}`} className="block w-full h-fit">
                            クイズ
                            </Link>
                        </button>
                    </div>




                    <div className="mt-5 mb-5 text-center text-1xl border-b-2 border-b-yellow-400">
                        単語カードリスト
                        <div className="flex w-fit h-hit px-2 py-1 ml-auto mr-auto items-center justify-center text-xs rounded-full bg-gray-100">カード数:{cards.length}枚</div>
                        <div className="text-center text-xs mt-1">リストをクリックすると詳細な情報を見ることができます</div>
                    </div>
                    
                    {cards.length == 0 && <div>カードがありません</div>}

                    {cards.map( (card:any) => (
                        <Link to={`/card/${card.id_encrypt}`} key={card.id}>
                            <div key={card.id} className="flex h-12 border bg-white border-gray-300 mb-3 /px-2 rounded">

                                {/* left */}
                                <div className="flex w-full border-r border-gray-300">

                                    <div className="flex w-5 items-center justify-center border-r border-gray-300">
                                        <div className={`w-2 h-2  rounded-full ${card.memory ? 'bg-amber-400' : 'bg-gray-400'}`}>
                                        </div>
                                    </div>

                                    <div className="w-full pt-2.5 pl-2">
                                        {card.word}
                                    </div>

                                    <div className="w-16 h-hit p-1">
                                        <img src={'/storage/images/card/'+ flashcard.user_id + '/' + flashcard.id + '/' + card.img_path} alt="" className="block w-10 h-10 rounded-full" />
                                    </div>

                                </div>

                                {/* right */}
                                <div className="flex w-full">

                                    <div className="mt-3 ml-2">
                                        {/* <BageDark value={card.category} /> */}
                                        <span className="block w-fit h-fit bg-gray-400 px-2 text-center text-white text-sm rounded">{card.category}</span>
                                    </div>
                                    
                                    <div className="mt-2.5 ml-2">
                                        {card.word_mean}
                                    </div>

                                </div>

                            </div>
                        </Link>
                    ))}

                </div>
            </div>
                
            

        </>
    );
}