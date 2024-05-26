<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WordMean;
use Illuminate\Support\Arr;//配列操作
use Hashids\Hashids;//idをランダムでユニークな文字列に変換/解読

class WordMeanController extends Controller
{

    //新規作成
    public function create(Request $request){

        $hashids = new Hashids('', 10); 
        $id = $hashids->decode($request->card_id)[0];//※配列で帰ってくる

        $word_means = new WordMean;
        $word_means->card_id = (int)$id;
        $word_means->category_id = (int)$request->category_id;
        $word_means->word_mean = $request->word_mean;
        $word_means->save();
    }

    //編集
    public function update(Request $request){
        $word_mean = WordMean::find($request->id);
        $word_mean->category_id = $request->category_id;
        $word_mean->word_mean = $request->word_mean; 
        $word_mean->save();
    }

    //削除
    public function delete(Request $request){
        $word_mean = WordMean::find($request->id)->delete();
    }
}
