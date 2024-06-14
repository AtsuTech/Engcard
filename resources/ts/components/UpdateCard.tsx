import { FC } from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { UpdateCardImage } from "./UpdateCardImage";
import { UpdateSubMean } from "./UpdateSubMean";
import { CreateSubMean } from "./CreateSubMean";
import { CategorySelect } from "./CategorySelect";
//import { SubMeanCategorySelect } from "./SubMeanCategorySelect";
import { ButtonWithOnClick } from "./parts_component/ButtonWithOnClick";
import { PageBack } from "./parts_component/PageBack";
import { Title } from "./parts_component/Title";
import { CategoryContext } from "./CategoryContext";


export const UpdateCard:FC = () => {

    //URLからパラメータを取得
    const { card_id } = useParams();

    const [reload,setReload] = useState(false);
    const valueReload = () =>{
        if(reload){
            setReload(false);
        }else if(!reload){
            setReload(true);
        }
    }

    const [card,setCard] = useState<any>({
        card_id:'',
        word:'',
        word_mean:'',
        sub_word_mean:'',
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
                card_id:response.data.id,
                word : response.data.word,
                word_mean : response.data.word_mean,
                sub_word_mean : response.data.wordmeans,
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
    },[reload]);



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


    //カテゴリデータをapi取得、更新の関数
    const [reloadCategory,setReloadCategory] = useState<boolean>(false);
    const SetReloadCategory = () => setReloadCategory(!reloadCategory);
    const [categories,setCategory] = useState<any>([]);
    useEffect(()=>{

        //DB通信でデータ取得
        axios.get('/api/categories').then((response) => { 
            setCategory(response.data);
        }).catch((error) => { 
            console.log(error);
        });
    
    },[reloadCategory]);
    

    return (

        <div className="block w-full ml-auto mr-auto p-5 rounded-3xl bg-white md:w-2/3">

            <PageBack />

            <Title title={'カード編集'} />

            <div>
                <Link to={`/flashcard/${card.flashcard_id}`}><span>単語帳:{card.flashcard_title}</span></Link>/
                <Link to=""><span>単語:{card.word}</span></Link>
            </div>

            <form>

                <label htmlFor="word">単語</label>
                <input type="text" 
                    id="word"
                    name="word" 
                    className="w-full h-10 border border-gray-300 pl-2 rounded-lg" 
                    placeholder="単語 ex.)Apple" 
                    value={card.word}
                    onChange={handleInput} 
                    required
                />

                <label htmlFor="word_mean">意味</label>
                <div className="flex w-full h-10 border border-gray-300 rounded-lg p-1 focus-within:border-amber-400">
                    <CategorySelect value={selected} name="category_id" handleInput={setSelected} />


                    <input type="text" 
                        id="word_mean"
                        name="word_mean" 
                        className="w-full pl-2" 
                        placeholder="訳 ex.)りんご" 
                        value={card.word_mean}
                        onChange={handleInput} 
                        required
                    />
                </div>

                {/* サブの意味 */}

                <label htmlFor="">サブの意味</label>
                <div className="w-full /h-10 border border-gray-300 p-2 rounded-lg">
                    <CategoryContext.Provider value={{categories,SetReloadCategory}}>
                        {card.sub_word_mean && card.sub_word_mean.length > 0 && 
                            card.sub_word_mean.map((sub_mean: any, index: number) => (
                                <div key={sub_mean.id} className="">
                                    <UpdateSubMean id={sub_mean.id} category_id={sub_mean.category_id} word_mean={sub_mean.word_mean} reload={valueReload} />        
                                </div>
                            ))
                            
                        }

                    </CategoryContext.Provider>

                    {card.sub_word_mean.length < 5 && 
                        <CreateSubMean card_id={card_id} reload={valueReload} />
                    } 
                </div>

                
                <div className="mt-5 mb-5">
                    <label htmlFor="">画像</label>
                    <UpdateCardImage id={card_id} />
                </div>
                
                <label htmlFor="sentence">例文</label>
                <textarea 
                    id="sentence"
                    name="sentence" 
                    rows={5} 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    // defaultValue={card.sentence}
                    value={card.sentence==null ? "": card.sentence}
                    onChange={handleInput} 
                    placeholder="例文:Apple is red and delicious fruits."
                    >
                </textarea>

                <label htmlFor="sentence_mean">例文の訳</label>
                <textarea 
                    id="sentence_mean"
                    name="sentence_mean" 
                    rows={5} 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    //defaultValue={card.sentence_mean}
                    value={card.sentence_mean==null ? "": card.sentence_mean}
                    onChange={handleInput} 
                    placeholder="例文(訳):りんごは赤くて美味しい果物です。"
                    >
                </textarea>

                <label htmlFor="link">関連リンク</label>
                <input type="text" 
                    id="link"
                    name="link" 
                    className="w-full h-10 border border-gray-300 pl-2 rounded-lg" 
                    placeholder="ex.)Gazotan.com" 
                    value={card.link==null ? "": card.link}
                    onChange={handleInput} 
                />

                <ButtonWithOnClick text="更新" color="yellow" onclick={UpdateSubmit} />
            </form>
        </div>
    );
}