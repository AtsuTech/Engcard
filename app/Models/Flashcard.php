<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Hashids\Hashids;//idをランダムでユニークな文字列に変換
use App\Models\Card;//カードの総数のアクセサリに使用
use App\Models\FlashcardFavorite;//お気に入りの総数のアクセサリに使用

class Flashcard extends Model
{
    use HasFactory;


    //request->all()でカラムにインサートする場合はこれを書く必要がある
    protected $fillable = ['user_id','title','access'];

    //リレーション
    public function user(){
        return $this->BelongsTo('App\Models\User');
    }

    //リレーション()
    public function users() {
        return $this->belongsToMany('App\Models\User');
    }

    //リレーション
    public function access(){
        return $this->BelongsTo('App\Models\Access');
    }

    //リレーション
    public function cards()
    {
        return $this->hasMany('App\Models\Card');
    }

    //リレーション
    public function flashcard_favorites()
    {
        return $this->hasMany('App\Models\FlashcardFavorite');
    }

    protected $casts = [
        'created_at' => 'datetime:Y年n月j日',
        'updated_at' => 'datetime:Y年n月j日',
    ];

    //アクセサリを使いuuidをカラムに追加する
    public function getUuidAttribute()
    {
        $hashids = new Hashids('', 10); 
        $uuid = $hashids->encode($this->id); 
        return $uuid;
    }

    //アクセサリを使いカードの総数をカラムに追加する
    public function getCardlengthAttribute()
    {
        $cards = Card::where('flashcard_id','=',$this->id)->get();
        return $cards->count();
    }

    //アクセサリを使いお気に入りの総数をカラムに追加する
    public function getFavoriteAttribute()
    {
        $cards = FlashcardFavorite::where('flashcard_id','=',$this->id)->get();
        return $cards->count();
    }


    //SPAでJSONでアクセサの値を返す時は$appendsメソッドで返す
    protected $appends = ['uuid','cardlength','favorite'];   

}
