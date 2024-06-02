import { FC } from "react";


export const ButtonWithOnClick:FC<{text:any,color:string,onclick:any,}> = ({text,color,onclick}) =>{
    
        
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
        <button 
            type="submit" 
            onClick={onclick}
            className={`block w-full h-12 text-white ml-auto mr-auto rounded-full font-medium text-lg ${color}`}>        
            {text}
        </button>
    );

}