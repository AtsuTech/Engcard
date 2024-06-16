import { FC } from "react";
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { DashBoardBreadcrumbs } from "./DashBoardBreadcrumbs";
import { Title } from "./parts_component/Title";
import { FlashcardList } from "./FlashcardList";

export const FlashcardFavoriteList:FC = () =>{

    document.title = "お気に入り";

    const [favorites ,setFavorites] = useState<any>([]);

    useEffect(()=>{
        // トークンでアクセスしてユーザー名を取得
        axios.get('/api/account/me').then((response:AxiosResponse|any) => { 
            console.log(response.data.flashcard_favorites);

            setFavorites(response.data.flashcard_favorites);

        }).catch((error:AxiosError|any) => { 
            // alert('NG');
            console.log(error.response.status);
            localStorage.setItem('auth_status',error.response.status);
        });
    },[]);

    return(
        <div className="block rounded-3xl bg-white text-slate-600 p-5">

            <DashBoardBreadcrumbs current="お気に入り" />

            <Title title="お気に入り" />

            <div className="w-full text-center py-3">
                全 {favorites ? favorites.length : 0} 件
            </div>

            

            {/* {me.flashcardfavorites.map((data:any) =>(<>{data.id}</>) )} */}


            {favorites.length > 0 ?
                favorites.map((favorite:any) => (
                    // <ul key={favorite.id}>
                    //     <li>
                    //         <Link to={`/flashcard/${favorite.flashcards.uuid}`}>
                    //             {favorite.flashcards.id}{favorite.flashcards.title}{favorite.flashcards.user.name}
                    //         </Link>
                    //     </li>
                    // </ul>
                    <div key={favorite.id} className="mb-1">
                        <FlashcardList
                            id= ""
                            uuid= {favorite.flashcards.uuid}
                            title= {favorite.flashcards.title}
                            description = {favorite.flashcards.description}
                            date = {favorite.flashcards.updated_at}
                            length = {favorite.flashcards.cardlength}
                            favorite = {favorite.flashcards.favorite}
                            user_id= ""
                            user_name= {favorite.flashcards.user.name}
                            user_img = {favorite.flashcards.user.profile_icon_img}

                        />                        
                    </div>

                ))

            :
                <>
                    <div className="flex items-center justify-center h-96">
                        <div>
                            <div className="mb-2">お気に入りがありません</div>
                        </div>
                    </div>
                </>
            }



                        
        </div>
    );
}