<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FlashCard;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use Illuminate\Support\Facades\Storage;//ストレージ操作
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class FlashCardController extends Controller
{
    //詳細画面
    function detail_flashcard($id){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($id)[0];//※配列で帰ってくる
        
        //デコードしたidで検索
        $flashcard = FlashCard::with(['user'])->with(['cards'])->findOrFail($id);
        return response()->json($flashcard);

    }


    //home画面で公開ステートの単語帳を取得
    function public_flashcard(Request $request){

        $public_flashcards = FlashCard::whereHas('access', function ($query) use ($request) {
            $query->where('type', 1);
        })->with(['user'])->with(['cards'])->get();

        return response()->json($public_flashcards);
    }

    //認証ユーザーの単語帳を取得
    function my_flashcards(){
        $my_flashcards = FlashCard::where('user_id',Auth::id())->with(['cards'])->with(['access'])->get();
        return response()->json($my_flashcards);
    }

    //新しい単語帳を作成
    function create(Request $request){
        //$flashcard = new FlashCard;
        //$flashcard->fill($request->all())->save();
        $id = FlashCard::insertGetId([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'access_id' => $request->access_id,
            "description" => $request->description,
            "created_at" =>  \Carbon\Carbon::now(), 
            "updated_at" => \Carbon\Carbon::now(),  
        ]);
        
        //idをハッシュ化
        $hashids = new Hashids('', 10); 
        $id = $hashids->encode($id);
        
        return response()->json(['success' => '作成できました','id' =>  $id]);
    }

    //単語帳の更新
    function update(Request $request){
        $flashcard = FlashCard::find($request->id);
        $flashcard->title = $request->title;
        $flashcard->access_id = $request->access_id;
        $flashcard->save();
    }

    //単語帳の削除
    function delete(Request $request){

        //単語帳に登録してあるカードの画像ファイルを全て削除
        $directory = '/public/images/card/' . Auth::id() . '/' . $request->id;
        Storage::deleteDirectory($directory);

        $flashcard = FlashCard::findOrFail($request->id)->delete();
        return response()->json(['success' => '削除しました']);

    }


}
