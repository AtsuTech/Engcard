import { FC } from "react";
import { useState, useEffect} from "react";
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';



export const UpdateCategory:FC<{id:any,value:any,Refresh:any}> = ({id,value,Refresh}) =>{

    const [category,setCategory] = useState(value);
    function handleInput(e:any){
        setCategory(e.target.value)
    }

    const [view,setView] = useState<boolean>(false);
    function View(){
        if(view){
            setView(false);
        }else if(!view){
            setView(true);
        }
    }

    function Update(){
        axios.post('/api/categories/my/update',{id: id, item: category}).then((response:AxiosResponse) => { 
            alert("更新しました。");
            View();
            Refresh();
        }).catch((error) => { 
            alert("失敗しました。");
            console.log(error);
        });
    }

    console.log(category);

    return(
        <>
        {view?
            <>
                <input 
                    type="text" 
                    className="w-full h-10 border border-gray-300 rounded pl-2" 
                    defaultValue={category} 
                    onChange={handleInput}
                />
                <button className="w-20" onClick={Update}>更新</button>
            </>
            
        :
            <>
                <div className="w-full">{value}</div>
                <button className="w-20" onClick={View}>編集</button>
            </>
            
        }
        
        </>
    );
}