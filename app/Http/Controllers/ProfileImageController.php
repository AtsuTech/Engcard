<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileImage;
use Illuminate\Support\Facades\Auth; // Authファサードを読み込む
use Illuminate\Support\Facades\Storage;

class ProfileImageController extends Controller
{
    //
    public function get_my_image(){
        $my_image = ProfileImage::where('user_id',Auth::id())->first();
        $img_path = $my_image->img_path;
        return response()->json($img_path);
    }

    public function create(Request $request){

        $my_image = ProfileImage::where('user_id',Auth::id())->first();

        if($my_image == null){

            $profile_image = new ProfileImage;
            $profile_image->user_id = Auth::id();

            $image = $request->file('image');
            if($image != null){
                $path = $image->store('public/images/profile');
                $profile_image->img_path = basename($path);
            }elseif($image == null){
                $profile_image->img_path = null;
            }

            $profile_image->save();

        }elseif($my_image != null){

            Storage::disk('public')->delete('images/profile/' . $my_image->img_path);
            $image = $request->file('image');
            $path = $image->store('public/images/profile');
            $my_image->img_path = basename($path);
            $my_image->save();

        }



    }
}
