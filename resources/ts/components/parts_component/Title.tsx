import { FC } from "react";

export const Title:FC<{title:string}> = ({title}) => {
    return(
        <>
            <h1 className="text-2xl w-full text-slate-700">
                {title}
            </h1>
        </>
    );
}
