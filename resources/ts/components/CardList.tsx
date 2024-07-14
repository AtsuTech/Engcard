import { FC,useRef, } from "react";
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { Bage } from "./parts_component/Bage";
import { Card } from "./Card";
import { CloseButton } from "./parts_component/CloseButton";


interface CardProps {
    id: any;
    uuid: any;
    memory: any;
    word: any;
    word_mean: any;
    category: any;
    sub_word_mean: any;
    sentence: any;
    sentence_mean: any;
    link: any;
    user_id: any;
    flashcard_id: any;
    img_path: any;
}




export const CardList:FC<CardProps> = ({
    id,
    uuid,
    memory,
    word,
    word_mean,
    category,
    sub_word_mean,
    sentence,
    sentence_mean,
    link,
    user_id,
    flashcard_id,
    img_path}) =>{


    //モーダル開閉
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => dialogRef.current?.close();

    const [imgFlag,setImgFlag] = useState<boolean>();
    useEffect(() => {
        if (img_path) {
            setImgFlag(true);
        }
    }, [img_path]);


    return(
        <>
        <div className="w-full"  key={id}>
            {/* <Link to={`/card/${uuid}`} key={id} className="w-full"> */}
                <div className="flex h-12 border bg-white border-gray-300 mb-3 /px-2 rounded-lg" onClick={openModal}>

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
            {/* </Link> */}

            <dialog id={ "#" + uuid } ref={dialogRef} className="w-full md:w-fit p-1 rounded-md">
                {/* <button onClick={closeModal}>close</button> */}
                <div className="flex items-center h-10">
                    <CloseButton onClick={closeModal} />
                    <Link to={`/card/${uuid}`} key={id} className="w-fit ml-auto text-center bg-amber-400 text-white px-2 rounded-full">別ページで見る</Link>   
                </div>

                <Card
                    date=""
                    memory={memory}
                    imgflag={imgFlag}
                    img_path={location.protocol + '//' + window.location.host + '/storage/images/card/'+ user_id + '/' + flashcard_id + '/' + img_path}
                    word={word}
                    word_mean={word_mean}
                    category={category}
                    sub_word_mean={sub_word_mean}
                    sentence={sentence}
                    sentence_mean={sentence_mean}
                    link={link}
                />  
            </dialog>
            
        </div>
        </>
    );
}