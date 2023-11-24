import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { UpdateCardImage } from "./UpdateCardImage";
import { CategorySelect } from "./CategorySelect";


export const UpdateCard:FC = () => {

    //URLからパラメータを取得
    const { card_id } = useParams();

    const [card,setCard] = useState({
        card_id:'',
        word:'',
        word_mean:'',
        sentence:'',
        sentence_mean:'',
        memory:'',
        link:'',
        flashcard_title:'',
        flashcard_id:'',
    });

    document.title = '編集:'+card.word;

    //品詞のselectチェック用のパラメータを設定
    const [selected,setSelected] = useState<any>();

    // パラメータ(暗号化されたid)付きでアクセスし、該当データをDBより取得
    useEffect(()=>{

        axios.get('/api/card/' + card_id).then((response) => { 
            console.log(response);
            
            setCard({
                card_id:response.data.id_encrypt,
                word : response.data.word,
                word_mean : response.data.word_mean,
                sentence : response.data.sentence,
                sentence_mean : response.data.sentence_mean,
                memory : response.data.memory,
                link : response.data.link,
                flashcard_title:response.data.flashcard.title,
                flashcard_id:response.data.flashcard.id_encrypt,
            });

            //品詞のselectチェックの初期値を設定
            setSelected(response.data.category_id);

        }).catch((error) => { 
            console.log(error);
        
        });
    },[]);



    //フォーム入力項目をcardにセット
    const handleInput =(e:any)=>{
        e.persist();
        setCard({...card, [e.target.name]: e.target.value }); 
        
    }


    //Submitボタンで更新データ送信処置
    const UpdateSubmit =(e:any)=>{
        e.preventDefault();
        
        //axios通信で渡すクエリパラメータ
        const params = new FormData();
        params.append('card_id',card.card_id);
        params.append('category_id',selected);
        params.append('word',card.word);
        params.append('word_mean',card.word_mean);
        params.append('sentence',card.sentence);
        params.append('sentence_mean',card.sentence_mean);
        params.append('link',card.link);

        
        //DBにデータ送る
        axios.post('/api/card/update', params).then(function (response: AxiosResponse<Response>) {

            // 送信成功時の処理
            alert('保存しました');

            
        })
        .catch(function (error:undefined|any) {

            // 送信失敗時の処理
            alert('失敗しました。');
            console.log(error);
            
        });
    }

    

    return (
        <section>
            
            <h5 className="text-3xl">カード編集</h5>

            <div>
                <Link to={`/flashcard/${card.flashcard_id}`}><span>単語帳:{card.flashcard_title}</span></Link>/
                <Link to=""><span>単語:{card.word}</span></Link>
            </div>

            <UpdateCardImage id={card_id} />

            <form>

                <input type="text" 
                    name="word" 
                    className="w-full h-10 border border-gray-300 rounded pl-2" 
                    placeholder="単語 ex.)Apple" 
                    value={card.word}
                    onChange={handleInput} 
                    required
                />

                <div className="flex">

                    <CategorySelect value={selected} handleInput={setSelected} />

                    <input type="text" 
                        name="word_mean" 
                        className="w-full h-10 border border-gray-300 rounded pl-2" 
                        placeholder="訳 ex.)りんご" 
                        value={card.word_mean}
                        onChange={handleInput} 
                        required
                    />
                    
                </div>
                
                <textarea 
                    name="sentence" 
                    rows={5} 
                    className="w-full p-2 border border-gray-300" 
                    // defaultValue={card.sentence}
                    value={card.sentence==null ? "": card.sentence}
                    onChange={handleInput} 
                    placeholder="例文:Apple is red and delicious fruits."
                    >
                </textarea>

                <textarea 
                    name="sentence_mean" 
                    rows={5} 
                    className="w-full p-2 border border-gray-300" 
                    //defaultValue={card.sentence_mean}
                    value={card.sentence_mean==null ? "": card.sentence_mean}
                    onChange={handleInput} 
                    placeholder="例文(訳):りんごは赤くて美味しい果物です。"
                    >
                </textarea>

                <input type="text" 
                    name="link" 
                    className="w-full h-10 border border-gray-300 rounded pl-2" 
                    placeholder="ex.)Gazotan.com" 
                    value={card.link==null ? "": card.link}
                    onChange={handleInput} 
                />

                <button 
                    //type="submit" 
                    className="block mr-0 bg-blue-400 w-36 h-10 text-white ml-auto mr-auto rounded-lg font-medium text-1xl"
                    onClick={UpdateSubmit}>
                    更新
                </button>
            </form>
        </section>
    );
}