<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use App\Models\PartOfSpeech;
use App\Models\Category;

class Card extends Model
{
    use HasFactory;

    public function flashcard(){
        return $this->BelongsTo('App\Models\Flashcard');
    }

    //アクセサを使いDBのデータを加工する。
    public function getIdEncryptAttribute()
    {
        //encryptメソッドでidを暗号化したものを、新しいカラムとして追加する
        return  encrypt($this->id);
    }

    public function getCategoryAttribute()
    {
        $category = Category::find($this->category_id,'item');
        return  $category['item'];
    }
    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['id_encrypt','category'];   

    protected $casts = [
        'created_at' => 'datetime:Y年n月j日',
        'updated_at' => 'datetime:Y年n月j日',
    ];
}
