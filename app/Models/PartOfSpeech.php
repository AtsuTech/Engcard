<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartOfSpeech extends Model
{
    use HasFactory;
    // public function partOfSpeech(){
    //     return $this->hasManyThrough('App\Models\PartOfSpeech');
    // }
    public function cards()
    {
        return $this->belongsTo('App\Models\Card');
    }


}
