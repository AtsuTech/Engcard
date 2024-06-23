import { FC } from "react";
import { UserList } from "./UserList";


export const FollowingUser:FC<{users:any}> = ({users}) =>{

    const modal = document.getElementById("following_modal") as any;

    const openFollowingModal =() =>{
        modal.showModal();
    }
    const closeFollowingModal =() =>{
        modal.close();
    }

    return(
        <>
            <button onClick={openFollowingModal}>
                <b>{users.length}</b> フォロー
            </button>

            <dialog id="following_modal" className="w-full md:w-96 p-3 rounded-lg h-screen overflow-auto">

                <div className="relative w-full">
                    <div className="text-center py-2">フォロー</div>
                    <button className="absolute top-1 right-1" onClick={closeFollowingModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {users.length == 0 && <div className="flex items-center justify-center h-full">まだフォローしていません</div>}
                
                {users.map( (user:any) => (
                    
                    <div onClick={closeFollowingModal}>
                        <UserList img={user.profile_icon_img} name={user.name} id={user.personal_id} />     
                    </div>
                                   
                ))}                   
            </dialog>
        </>
    );
}