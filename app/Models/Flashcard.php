<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flashcard extends Model
{
    use HasFactory;


    //request->all()でカラムにインサートする場合はこれを書く必要がある
    protected $fillable = ['user_id','title','access'];

    public function user(){
        return $this->BelongsTo('App\Models\User');
    }


    protected $casts = [
        'created_at' => 'datetime:Y年n月j日',
        'updated_at' => 'datetime:Y年n月j日',
    ];


    //アクセサを使いDBのデータを加工する。
    public function getIdEncryptAttribute()
    {
        //encryptメソッドでidを暗号化したものを、新しいカラムとして追加する
        return  encrypt($this->id);
    }
    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['id_encrypt'];   

}
