import { FC } from "react";


export const InputWithValidation:FC<{label:any,type:any,name:any,value:any,placeholder:any,func:any,error:any}> = ({label,type,name,value,placeholder,func,error}) =>{
    return(
        <div className="pt-4">

            <label htmlFor={name} className="block pl-2 mb-1">
                {label}
            </label>

            <input 
                //autoComplete="off"
                id={name}
                type={type} 
                name={name}
                value={value}  
                onChange={func} 
                className={`block w-full pl-3 h-10 border bg-gray-200 rounded-full ${error ? "border border-rose-500 bg-rose-200" : ""}`}
                placeholder={placeholder}
            />
            {error && 
                <div>
                    <span className="text-rose-500 text-xs">{error}</span>
                </div>
            }
        </div>
    );
}