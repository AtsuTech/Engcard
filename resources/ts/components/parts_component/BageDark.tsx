import { FC } from "react";

export const BageDark:FC<{value:any}> = ({value}) => {
    return(
        <>
            <span className="block w-fit h-fit bg-gray-600 text-white text-xs font-medium px-1.5 py-1.5 rounded-lg">
                {value}
            </span>
        </>
    );
}





