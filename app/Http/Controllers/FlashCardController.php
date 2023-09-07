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
        $flashcard = FlashCard::with(['user'])->findOrFail($id);
        return response()->json($flashcard);

    }


    //home画面で公開ステートの単語帳を取得
    function public_flashcard(Request $request){
        $public_flashcards = FlashCard::where('access',0)->with(['user'])->get();
        return response()->json($public_flashcards);
    }

    //新しい単語帳を作成
    function create(Request $request){
        $flashcard = new FlashCard;
        $flashcard->fill($request->all())->save();
        return response()->json(['success' => '作成できました']);
    }
}
