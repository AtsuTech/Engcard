<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject; //追記
//use App\Models\ProfileImage; //プロフィール画像のパスをカラムに追加のため使用
//use App\Models\Follow;//フォローモデル
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

    //リレーション
    // public function profileImage(){
    //     return optional($this->hasOne('App\Models\profileImage'));
    // }
    // public function follows(){
    //     return optional($this->hasMany('App\Models\Follow'));
    // }

    //リレーション
    // public function follows()
    // {
    //     return $this->hasMany('App\Models\Follow');
    // }


    public function following()
    {
        return $this->belongsToMany(User::class, 'follows','following', 'followed');
        //return $this->belongsToMany(User::class, 'follows','followed','following');
        
    }


    public function followed()
    {
        //return $this->belongsToMany(User::class, 'follows','following', 'followed');
        return $this->belongsToMany(User::class, 'follows','followed','following');
        
    }




}
