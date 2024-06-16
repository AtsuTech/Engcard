<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashcardFavorite extends Model
{
    use HasFactory;

    //単語帳のリレーション
    public function flashcards() {
        return $this->belongsTo(Flashcard::class, 'flashcard_id');
    }
}
