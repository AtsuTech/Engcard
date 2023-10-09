import { FC } from "react";

export const BageLight:FC<{value:any}> = ({value}) => {
    return(
        <>
            <span className="block w-fit h-fit border border-gray-600 /bg-gray-600 text-gray-600 text-xs font-medium px-1.5 py-1.5 rounded-lg">
                {value}
            </span>
        </>
    );
}