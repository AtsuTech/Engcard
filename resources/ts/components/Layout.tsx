import { FC } from "react"
import { Outlet } from 'react-router-dom';
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout: FC = () => {


    return (
        <>
            <NavBar />
            <main className="bg-zinc-100 pt-10 pb-10">
                <div className="block w-2/3 ml-auto mr-auto p-5 rounded-3xl bg-white text-slate-600">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    )

}