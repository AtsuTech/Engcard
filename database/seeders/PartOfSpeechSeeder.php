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
        //
        PartOfSpeech::create([
            'code' => 0,
            'part_of_speeche' => '未選択',
        ]);

        PartOfSpeech::create([
            'code' => 1,
            'part_of_speeche' => '名詞',
        ]);

        PartOfSpeech::create([
            'code' => 2,
            'part_of_speeche' => '代名詞',
        ]);

        PartOfSpeech::create([
            'code' => 3,
            'part_of_speeche' => '動詞',
        ]);

        PartOfSpeech::create([
            'code' => 4,
            'part_of_speeche' => '形容詞',
        ]);

        PartOfSpeech::create([
            'code' => 5,
            'part_of_speeche' => '副詞',
        ]);

        PartOfSpeech::create([
            'code' => 6,
            'part_of_speeche' => '助動詞',
        ]);

        PartOfSpeech::create([
            'code' => 7,
            'part_of_speeche' => '前置詞',
        ]);

        PartOfSpeech::create([
            'code' => 8,
            'part_of_speeche' => '冠詞',
        ]);

        PartOfSpeech::create([
            'code' => 9,
            'part_of_speeche' => '接続詞',
        ]);

        PartOfSpeech::create([
            'code' => 10,
            'part_of_speeche' => '間投詞',
        ]);

    }
}
