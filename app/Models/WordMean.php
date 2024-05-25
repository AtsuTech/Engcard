<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category; //カテゴリの情報使用

class WordMean extends Model
{
    use HasFactory;

        //アクセサリを使いカテゴリをカラムに追加する
        public function getCategoryAttribute()
        {
            $category = Category::find($this->category_id,'item');
            return  $category['item'];
        }
        //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
        protected $appends = ['category'];  
}
