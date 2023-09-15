<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['id_encrypt'];   
}
