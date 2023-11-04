<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FlashCard;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む


class FlashCardController extends Controller
{
    //詳細画面
    function detail_flashcard($id){

        //暗号化したidをデコード
        $id = decrypt($id);
        
        //デコードしたidで検索
        $flashcard = FlashCard::with(['user'])->with(['cards'])->findOrFail($id);
        return response()->json($flashcard);

    }


    //home画面で公開ステートの単語帳を取得
    function public_flashcard(Request $request){
        //リレーション先のaccessesテーブルのtypeで公開ステータス(type=1)に絞り込み
        $public_flashcards = FlashCard::whereHas('access', function ($query) use ($request) {
            $query->where('type', 1);
        })->with(['user.profileImage'])->with(['cards'])->get();

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
        $id = encrypt($id);
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

        $flashcard = FlashCard::findOrFail($request->id)->delete();
        return response()->json(['success' => '削除しました']);

    }


}
