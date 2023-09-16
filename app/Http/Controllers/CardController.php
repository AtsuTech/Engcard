<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use Illuminate\Contracts\Database\Query\Builder;

class CardController extends Controller
{
    //
    public function create(Request $request){
        $Card = new Card;

        $Card->flashcard_id = decrypt($request->flashcard_id);
        $Card->user_id = Auth::id();

        $image = $request->file('image');
        if($image != null){
            $path = $image->store('public/images');
            $Card->img_path = basename($path);
        }elseif($image == null){
            $Card->img_path = "";
        }
       

        //$Card->part_of_speech_id = (int)$request->part_of_speech_id; 
        $Card->part_of_speech_id = $request->integer('part_of_speech_id');
        $Card->word = $request->word;
        $Card->word_mean = $request->word_mean;
        $Card->sentence = $request->sentence;
        $Card->sentence_mean = $request->sentence_mean;
        $Card->memory = false;

        $Card->save();
    }

    //詳細画面
    function public_detail_card($id){

        //暗号化したidをデコード
        $id = decrypt($id);
        
        //デコードしたidで検索
        $card = Card::with(['flashcard'])->findOrFail($id);

        $access = $card->flashcard->access;
        if($access == 1){
            return response()->json(['message' => '非公開のカードです']);
        }elseif($access == 0){
            return response()->json($card);
        }

    }

}
