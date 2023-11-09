import { FC } from "react";


export const Button:FC<{text:any,color:string}> = ({text,color}) =>{

    if(color == "yellow"){
        color = "bg-amber-400"
    }else if(color == "red"){
        color = "bg-rose-400"
    }else if(color == "green"){
        color = "bg-green-400"
    }else if(color == "blue"){
        color = "bg-blue-400"
    }else if(color == "gray"){
        color = "bg-gray-400"
    }



    return(
        <button type="submit" 
            className={`block mt-10  w-full h-10 text-white ml-auto mr-auto rounded-full shadow-lg font-medium text-1xl ${color}`}>
            {text}
        </button>
    );
}