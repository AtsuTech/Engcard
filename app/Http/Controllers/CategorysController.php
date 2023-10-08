<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class CategorysController extends Controller
{
    //一覧取得
    public function list(){
        $categorys = Category::where('user_id', -1)->orWhere('user_id', Auth::id())->get();
        return response()->json($categorys);
    }

    //追加
    public function create(Request $reques){
        $Category = new Category;

        $Category->user_id = Auth::id();
        $Category->item = $reques->item;

        $Category->save();

    }
}
