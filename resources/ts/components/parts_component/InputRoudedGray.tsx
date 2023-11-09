import { FC } from "react";


export const InputRoundedGray:FC<{label:any,type:any,name:any,value:any,placeholder:any,func:any,error:any}> = ({label,type,name,value,placeholder,func,error}) =>{
    return(
        <div className="pt-4">

            <label htmlFor={name} className="pl-2">
                {label}
            </label>

            {error && 
                <div>
                    <span className="text-rose-500">{error}</span>
                </div>
            }

            <input 
                autoComplete="off"
                id={name}
                type={type} 
                name={name}
                value={value}  
                onChange={func} 
                className={`block w-full pl-3 h-10 border bg-gray-200 rounded-full ${error ? "border border-rose-500 bg-rose-200" : ""}`}
                placeholder={placeholder}
            />
        </div>
    );
}