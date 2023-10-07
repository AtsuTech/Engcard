<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Category::create([
            'user_id' => -1,
            'item' => '設定なし',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '名詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '代名詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '動詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '形容詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '副詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '助動詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '前置詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '冠詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '接続詞',
        ]);

        Category::create([
            'user_id' => -1,
            'item' => '間投詞',
        ]);

    }
}
