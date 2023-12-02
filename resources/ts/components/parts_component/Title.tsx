import { FC } from "react";

export const Title:FC<{title:string}> = ({title}) => {
    return(
        <>
            <h1 className="text-2xl w-full font-light text-slate-800">
                {title}
            </h1>
        </>
    );
}
