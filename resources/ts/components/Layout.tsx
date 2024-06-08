import { FC } from "react"
import { Outlet } from 'react-router-dom';
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout: FC = () => {


    return (
        <>
            <NavBar />
            <main className="md:bg-zinc-100 p-0 m-0 md:pt-10 md:pb-10">
                <div className="block md:max-w-4xl md:w-2/3 ml-auto mr-auto md:p-5 text-slate-600">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    )

}