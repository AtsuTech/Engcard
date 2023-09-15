import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from 'axios';

export const Card:FC = () => {

    //URLからパラメータを取得
    const { card_id } = useParams();

    const [card,setCards] = useState({
        word:'',
        word_mean:'',
        img_path:'',
        sentence:'',
        sentence_mean:'',
        memory:'',
        part_of_speech:'',
        flashcard_title:'',
        created_at:'',
    });

    const[message,setMassage] = useState('');

    document.title = '単語:'+card.word;

    useEffect(()=>{

        // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
        axios.get('/api/card/' + card_id).then((response) => { 
            console.log(response);
            
            setCards({
                word : response.data.word,
                word_mean : response.data.word_mean,
                img_path : '/storage/images/' + response.data.img_path,
                sentence : response.data.sentence,
                sentence_mean : response.data.sentence_mean,
                memory : response.data.memory,
                part_of_speech : response.data.part_of_speech,
                flashcard_title:response.data.flashcard.title,
                created_at: response.data.created_at,
            });

            setMassage(response.data.message);

            //console.log(card);

        }).catch((error) => { 
            console.log(error);
        
        });
    },[]);



    return(
        <>
            <h5>{message}</h5>
            <h5>{card.flashcard_title}</h5>
            <p>{card.word_mean}</p>
            <div style={{ backgroundImage: `url(${card.img_path})` }} 
                className="bg-cover bg-center w-full h-64 text-5xl text-center">
                {card.word}
            </div>
            <div>{card.sentence}</div>
            <div>{card.sentence_mean}</div>
            <div>{card.memory}</div>
            <div>{card.part_of_speech}</div>
            <div>{card.created_at}</div>
        </>
    );
}