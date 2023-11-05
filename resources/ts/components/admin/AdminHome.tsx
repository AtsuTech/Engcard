import { FC } from "react";


export const AdminHome:FC =()=>{

    return(
        <>
            <h1>Home</h1>

            <section className="bg-white w-60 h-60 p-2 m-2 rounded-lg">
                <h5 className="text-2xl">register</h5>
                <h5 className="text-6xl">1,239</h5>
                <div>pepoles</div>
            </section>

            <section className="bg-white w-60 h-60 p-2 m-2 rounded-lg">
                <h5 className="text-2xl">Flascards</h5>
                <h5 className="text-6xl">8,239</h5>
                <div>pepoles</div>
            </section>
            
        </>
    )
}