<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use App\Models\PartOfSpeech;
use App\Models\Category;
use Hashids\Hashids;//idをランダムでユニークな文字列に変換

class Card extends Model
{
    use HasFactory;

    public function flashcard(){
        return $this->BelongsTo('App\Models\Flashcard');
    }

    public function wordmeans(){
        return  $this->HasMany('App\Models\WordMean');
    }

    //アクセサリを使いuuidをカラムに追加する
    public function getUuidAttribute()
    {
        $hashids = new Hashids('', 10); 
        $uuid = $hashids->encode($this->id); 
        return $uuid;
    }

    //アクセサリを使いカテゴリをカラムに追加する
    public function getCategoryAttribute()
    {
        $category = Category::find($this->category_id,'item');
        return  $category['item'];
    }
    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['uuid','category'];   

    protected $casts = [
        'memory' => 'boolean',//SQLではBoolean型がtinyintになり0か1で保存されるためboolean値にキャストする
        'created_at' => 'datetime:Y年n月j日',
        'updated_at' => 'datetime:Y年n月j日',
    ];
}
