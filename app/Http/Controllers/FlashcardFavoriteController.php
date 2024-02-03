<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FlashcardFavorite;
use App\Models\Flashcard;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class FlashcardFavoriteController extends Controller
{
    
    //いいねに紐付くデータ(ユーザー)を取得(これ使わないかもしれない)
    public function get_favorite($id){
        
        $favolite = FlashcardFavorite::where('flashcard_id',$id)->get();
        return response()->json($favolite);
    }


    //いいね数のみを取得
    public function get_favorite_count($id){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($id)[0];//※配列で帰ってくる

        $favolite = FlashCard::withCount(['flashcard_favorites'])->find($id);
        return response()->json($favolite->flashcard_favorites->count());

    }


    //いいね済みかどうかチェック
    public function check_my_favorite($id){
        
        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($id)[0];//※配列で帰ってくる

        $check = FlashcardFavorite::where('flashcard_id',$id)->where('user_id', Auth::id())->get();
        if($check->isNotEmpty()){
            return response()->json(true);
        }elseif(!$check->isNotEmpty()){
            return response()->json(false);
        }
        
    }



    //いいねをつける
    public function add_favorite(Request $request){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる

        $check = FlashcardFavorite::where('flashcard_id',$id)->where('user_id', Auth::id())->get();

        if(!$check->isNotEmpty()){
            $favorite = new FlashcardFavorite();
            $favorite->user_id = Auth::id();
            $favorite->flashcard_id = $id;
            $favorite->save();
        }
    }

    //いいねを外す
    public function delete_favorite(Request $request){

        //ハッシュ化されたuuidをデコード
        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($request->flashcard_id)[0];//※配列で帰ってくる
        
        FlashcardFavorite::where('flashcard_id',$id)->where('user_id', Auth::id())->delete();
        
    }

}
