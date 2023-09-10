<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

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
       

        $Card->part_of_speech = $request->part_of_speech; 
        $Card->word = $request->word;
        $Card->word_mean = $request->word_mean;
        $Card->sentence = $request->sentence;
        $Card->sentence_mean = $request->sentence_mean;
        $Card->memory = false;

        $Card->save();
    }

}
