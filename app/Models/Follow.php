<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    //request->all()でカラムにインサートする場合はこれを書く必要がある
    protected $fillable = ['following','followed'];

    // public function user(){
    //     return $this->BelongsTo('App\Models\User');
    // }

}
