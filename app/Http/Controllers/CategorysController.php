<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Card;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class CategorysController extends Controller
{
    //一覧取得
    public function list(){
        $categorys = Category::where('user_id', -1)->orWhere('user_id', Auth::id())->get();
        return response()->json($categorys);
    }

    //idで取得
    public function get(Request $request){
        $category = Category::find($request->id);
        return response()->json($category);
    }


    //ユーザーが作成したカテゴリのみ取得
    public function my_list(){
        $categorys = Category::where('user_id', Auth::id())->with(['cards'])->get();
        return response()->json($categorys);
    }

    //追加
    public function create(Request $request){
        $Category = new Category;

        $Category->user_id = Auth::id();
        $Category->item = $request->item;

        $Category->save();

    }

    //更新
    public function update(Request $request){
        $Categorys = Category::find($request->id);
        $Categorys->item = $request->item;
        $Categorys->save();
    }

    //削除
    public function delete(Request $request){

        //カテゴリ削除する際は、そのカテゴリが設定されているカードのカテゴリを1(設定なし)に変更する。
        $Card = Card::where('category_id',$request->id)->update([
            'category_id' => 1
        ]);

        $categorys = Category::find($request->id)->delete();
    }

}
