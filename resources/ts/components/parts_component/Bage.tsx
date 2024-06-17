import { FC } from "react";

export const Bage:FC<{value:any}> = ({value}) => {
    return(
        <>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-1 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                {value}
            </span>
        </>
    );
}