<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use App\Models\WordMean;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Support\Facades\Storage;//ストレージ操作
use Illuminate\Support\Arr;//配列操作
use Hashids\Hashids;//idをランダムでユニークな文字列に変換/解読

class CardController extends Controller
{




    //新規追加
    public function create(Request $request){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $flashcard_id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる


        //カード画像保存先パス
        $directory = 'public/images/card/' . Auth::id() . '/' . $flashcard_id;

        // $Card = new Card;

        // $Card->flashcard_id = $flashcard_id;
        // $Card->user_id = Auth::id();

        // $image = $request->file('image');
        // if($image != null){
        //     $path = $image->store($directory);
        //     $Card->img_path = basename($path);
        // }elseif($image == null){
        //     $Card->img_path = null;
        // }
       

        // $Card->category_id = $request->integer('category_id');
        // $Card->word = $request->word;
        // $Card->word_mean = $request->word_mean;

        // if($request->sentence == null||$request->sentence ==""){
        //     $Card->sentence = "";
        // }else{
        //     $Card->sentence = $request->sentence;
        // }

        // if($request->sentence_mean == null||$request->sentence_mean ==""){
        //     $Card->sentence_mean = "";
        // }else{
        //     $Card->sentence_mean = $request->sentence_mean;
        // }
        
        // $Card->memory = false;

        // $Card->save();

        //画像ファイル受け取り
        $image = $request->file('image');
        //画像ファイルの有無判定
        if($image != null){
            //画像ファイルがあれば、public下ディレクトにファイル保存
            $path = $image->store($directory);
            //DBにファイル名を保存
            $img_path = basename($path);
        }elseif($image == null){
            //画像ファイルが無ければ、DBにファイル名をnullで保存
            $img_path = null;
        }

        $id = Card::insertGetId([
            "flashcard_id" => $flashcard_id,
            "user_id" => Auth::id(),
            "img_path" => $img_path,
            "category_id" => $request->integer('category_id'),
            "word" => $request->word,
            "word_mean" => $request->word_mean,
            "sentence" => empty($request->sentence) ? "" : $request->sentence,
            "sentence_mean" => empty($request->sentence_mean) ? "" : $request->sentence_mean,
            "memory" => false,

            "created_at" =>  \Carbon\Carbon::now(), 
            "updated_at" => \Carbon\Carbon::now(),  
        ]);


        //サブの意味を保存
        if(!empty($request->sub_means)){
            // JSON文字列を配列に変換
            $sub_means_array = json_decode($request->sub_means, true);

            // 配列として適切にアクセスできることを確認した後に、ループを実行
            foreach ($sub_means_array as $sub_mean) {
                // 記入があものだけ保存する
                if($sub_mean['word_mean'] != ""){
                    $sub_word_means = new WordMean;
                    $sub_word_means->card_id = $id;
                    $sub_word_means->category_id = (int)$sub_mean['category_id'];
                    $sub_word_means->word_mean = $sub_mean['word_mean'];
                    $sub_word_means->save();
                }
            }
        }

    }

    //詳細画面
    function public_detail_card($id){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($id)[0];//※配列で帰ってくる
        
        //デコードしたidで検索
        $card = Card::with(['flashcard'])->with('wordmeans')->findOrFail($id);

        $access = $card->flashcard->access->type;
        if($access == 0){
            return response()->json(['message' => '非公開のカードです']);
        }elseif($access == 1){
            return response()->json($card);
        }

    }

    //(クイズ用)ランダムに3件取得
    public function quiz_choices(Request $request){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $flashcard_id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる
        

        /*---------------<フロント側で表示中の単語の意味データ(正解の選択肢)の取得>-------------------------
        *フロントエンドから単語帳idと単語カードのindex番号を受け取る。
        *まず単語帳idで単語カードを絞る
        *次に、単語カードのindex番号でskip()で何番目からデータを取り始めるかを決める。
        *欲しい件数は1個だけなのでtake()に1を指定する
        *配列として扱うのでtoArray()
        */
        $correct = Card::where('flashcard_id',$flashcard_id)//単語帳に紐づくカードだけにフィルタ
                        ->skip($request->card_index)//フロントから送られてきたインデックス(カードのDBでの保存順)までスキップしてデータを取得
                        ->take(1)//1つ取得。skipとtake(1)を組み合わせて街灯のインデックスのカードだけ取得
                        ->get()
                        ->pluck('word_mean')//word_meanカラムだけを取得
                        ->toArray();//配列に変換

        //フロント側で表示中の単語の意味データ(正解の選択肢)のid(pk)を取得
        $correct_id = Card::where('flashcard_id',$flashcard_id)->skip($request->card_index)->take(1)->get()->pluck('id')->first();

        //正解のカードの意味を取得
        $word_mean = Card::find($correct_id)->word_mean;

        //不正解の選択肢を、正解の選択肢を除くものからランダムに3つ取得(今の所、他の単語帳のカードからも選択肢取ってくる仕様)
        $incorrect = Card::where('id','!=',$correct_id) //正解のカードのidを除く
                            ->where('word_mean','!=',$word_mean) //正解のカードと同一の値(同じテキストの単語の意味)がある場合は除く
                            ->inRandomOrder()//ランダムに取得
                            ->take(3)//３つ取得
                            ->get()//複薄データを取得
                            ->pluck('word_mean')//word_meanカラムだけを取得
                            ->toArray();//配列に変換

        $incorrect = array_values(array_unique($incorrect)); // 重複を除外

        //配列の結合(不正解選択肢+正解の選択肢)
        $choices = array_merge($incorrect,$correct);

        //結合した配列をシャッフル
        $choices = Arr::shuffle($choices);

        //データ吐き出し
        return response()->json($choices);
    }

    //クイズ正解時に暗記完了にする
    public function memory(Request $request){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $flashcard_id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる
        
        $correct = Card::where('flashcard_id',$flashcard_id)->skip($request->card_index)->take(1)->first();
        $correct->memory = true;
        $correct->save();
    }


    //クイズ不正解時に暗記未完了にする
    public function un_memory(Request $request){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $flashcard_id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる
        
        $correct = Card::where('flashcard_id',$flashcard_id)->skip($request->card_index)->take(1)->first();
        $correct->memory = false;
        $correct->save();
    }

    //編集
    public function update(Request $request){
        //$Card = Card::find(decrypt($request->card_id));
        $Card = Card::find($request->card_id);

        $Card->category_id = $request->integer('category_id');
        $Card->word = $request->word;
        $Card->word_mean = $request->word_mean;
        $Card->sentence = $request->sentence;
        $Card->sentence_mean = $request->sentence_mean;
        $Card->link = $request->link;
 
        $Card->save();
    }

    //画像のみ編集
    public function update_only_image(Request $request){

        //$Card = Card::find(decrypt($request->card_id));
        $Card = Card::find($request->card_id);
        
        //カード画像保存先パス
        $directory = 'public/images/card/' . Auth::id() . '/' . $Card->flashcard_id;


        $image = $request->file('image');
        if($image != null){

            //すでに画像がある場合は画像ファイル削除する
            if($Card->img_path != null || $Card->img_path != ""){
                $delete_target = '/images/card/' . Auth::id() . '/' . $Card->flashcard_id . '/';
                Storage::disk('public')->delete($delete_target . $Card->img_path);
            }
            
            $path = $image->store($directory);
            $Card->img_path = basename($path);
        }elseif($image == null){
            $Card->img_path = null;
        }

        $Card->save();

    }

    //画像削除
    public function delete_image(Request $request){

        //$Card = Card::find(decrypt($request->card_id));
        $Card = Card::find($request->card_id);

        Storage::disk('public')->delete('/images/card/' . Auth::id() . '/' . $Card->flashcard_id . '/' . $Card->img_path);
        $Card->img_path = null;
        $Card->save();
    }


    //カード削除
    public function delete(Request $request){
        $Card = Card::find($request->card_id);
        Storage::disk('public')->delete('/images/card/' . Auth::id() . '/' . $Card->flashcard_id . '/' . $Card->img_path);
        $delete_card = Card::find($request->card_id)->delete();
    }

}
