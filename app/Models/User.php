<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject; //追記
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'personal_id',//追加
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'created_at' => 'datetime:Y年n月j日 H:i',
        'updated_at' => 'datetime:Y年n月j日 H:i',
    ];

    //追記
    public function getJWTIdentifier()
    {
       return $this->getKey();
    }

    //追記
    public function getJWTCustomClaims()
    {
       return [];
    }


    //フォローのリレーション
    public function following()
    {
        return $this->belongsToMany(User::class, 'follows','following', 'followed');
        
    }

    //フォロワーのリレーション
    public function followed()
    {
        return $this->belongsToMany(User::class, 'follows','followed','following');
        
    }


    //単語帳のリレーション
    public function flashcards()
    {
        return $this->HasMany('App\Models\Flashcard');
    }

    //単語カードのリレーション
    public function cards()
    {
        return $this->HasMany('App\Models\Card');
    }

    //単語帳お気に入りのリレーション
    public function flashcard_favorites()
    {
        return $this->HasMany('App\Models\FlashcardFavorite');
    }


}
