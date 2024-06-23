import { FC } from "react";

export const PageNotFound:FC =()=>{
    return(
        <>
            <div className="flex items-center justify-center py-20 /h-screen">
                <div className="text-center">
                    <div className="text-6xl text-amber-400 font-bold">
                        404
                    </div>  
                    <p>ページが見つかりません</p>                  
                </div>
            </div>
        </>
    );
}