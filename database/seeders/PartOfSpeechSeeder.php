<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PartOfSpeech;

class PartOfSpeechSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //品詞の項目は不変なものなのであらかじめデータを作る
        PartOfSpeech::create([
            'item' => '未選択',
        ]);

        PartOfSpeech::create([
            'item' => '名詞',
        ]);

        PartOfSpeech::create([
            'item' => '代名詞',
        ]);

        PartOfSpeech::create([
            'item' => '動詞',
        ]);

        PartOfSpeech::create([
            'item' => '形容詞',
        ]);

        PartOfSpeech::create([
            'item' => '副詞',
        ]);

        PartOfSpeech::create([
            'item' => '助動詞',
        ]);

        PartOfSpeech::create([
            'item' => '前置詞',
        ]);

        PartOfSpeech::create([
            'item' => '冠詞',
        ]);

        PartOfSpeech::create([
            'item' => '接続詞',
        ]);

        PartOfSpeech::create([
            'item' => '間投詞',
        ]);


    }
}
