<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FlashcardFavorite;
use App\Models\Flashcard;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class FlashcardFavoriteController extends Controller
{
    
    //いいねに紐付くデータ(ユーザー)を取得(これ使わないかもしれない)
    public function get_favorite($id){
        
        $favolite = FlashcardFavorite::where('flashcard_id',$id)->get();
        return response()->json($favolite);
    }


    //いいね数のみを取得
    public function get_favorite_count($id){

        $id = decrypt($id);

        $favolite = FlashCard::withCount(['flashcard_favorites'])->find($id);
        return response()->json($favolite->flashcard_favorites->count());

    }


    //いいね済みかどうかチェック
    public function check_my_favorite($id){
        $id = decrypt($id);
        $check = FlashcardFavorite::where('flashcard_id',$id)->where('user_id', Auth::id())->get();
        if($check->isNotEmpty()){
            return response()->json(true);
        }elseif(!$check->isNotEmpty()){
            return response()->json(false);
        }
        
    }



    //いいねをつける
    public function add_favorite(Request $request){

        $request->flashcard_id = decrypt($request->flashcard_id);

        $check = FlashcardFavorite::where('flashcard_id',$request->flashcard_id)->where('user_id', Auth::id())->get();

        if(!$check->isNotEmpty()){
            $favorite = new FlashcardFavorite();
            $favorite->user_id = Auth::id();
            $favorite->flashcard_id = $request->flashcard_id;
            $favorite->save();
        }
    }

    //いいねを外す
    public function delete_favorite(Request $request){

        $request->flashcard_id = decrypt($request->flashcard_id);

        FlashcardFavorite::where('flashcard_id',$request->flashcard_id)->where('user_id', Auth::id())->delete();
        
    }

}
