import { FC } from "react";
import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FlashcardList } from "./FlashcardList";

document.title = 'ホーム';

export const Home: FC = () => {

    const [flashcards,setFlashcards] = useState<any>([]);

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/flashcard/public').then((response) => { 
            console.log(response);
            setFlashcards(response.data);

        }).catch((error) => { 
            
        });
    },[]);



    return (
        <main className="w-full /mt-5 /mb-10 p-5 rounded-3xl bg-white text-slate-600">

            <div>
                <h1 className="text-2xl">Home</h1>
                <h1>さがす</h1>
                <div className="flex">
                    <input type="text" className="w-full h-12 border border-gray-300 rounded-lg " />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <h1>タイムライン</h1>
            </div>

            <div className="flex flex-wrap w-full /ml-auto /mr-auto /mt-10 mb-10 /p-5 /rounded-3xl /bg-white /text-slate-600">
                

                {flashcards.length ==0 && <div className="w-full h-96 text-2xl flex justify-center items-center">単語帳がありません</div>}

                {flashcards.map( (flashcard:any) => (
                    
                    // <div key={flashcard.id} className="block w-full md:w-3/6 p-1">
                    //     <div className="border border-gray-300 p-2 rounded">
                    //     <Link to={`/flashcard/${flashcard.uuid}`} className="block w-full text-2xl">
                    //         {flashcard.title}
                    //     </Link>
                    //     <div className="flex">
                    //         <small className="mr-2">{flashcard.updated_at}</small>
                    //         <Link to={'/profile/' + flashcard.user.personal_id}>
                    //             <div className="mr-2 flex">
                                    
                    //                 <div className="pt-0.5">
                    //                     {flashcard.user.profile_icon_img != null && <img src={'/storage/images/profile/' + flashcard.user.profile_icon_img} width={17} height={17} alt="" className="block rounded-full mr-1" />}
                    //                     {flashcard.user.profile_icon_img == null && <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" width={17} height={17} alt="" className="block rounded-full mr-1" />}
                    //                 </div>
                    //                 <small>{flashcard.user.name}</small>
                                    
                    //             </div>
                    //         </Link>
                    //         <small>カード枚数:{flashcard.cards.length}</small>
                    //         {/* {typeof flashcard.id} */}
                    //         {/* <FlashcardFavorite id={flashcard.id} /> */}
                    //     </div>
                    //     </div>
                    // </div>

                    <div key={flashcard.id} className="block w-full md:w-3/6 p-0.5">
                        <FlashcardList
                            id= ""
                            uuid= {flashcard.uuid}
                            title= {flashcard.title}
                            description = {flashcard.description}
                            date = {flashcard.updated_at}
                            length = {flashcard.cardlength}
                            favorite = {flashcard.favorite}
                            user_id= ""
                            user_name= {flashcard.user.name}
                            user_img = {flashcard.user.profile_icon_img}

                        />                        
                    </div>
                    
                ))}

            </div>
        </main>

    )

}