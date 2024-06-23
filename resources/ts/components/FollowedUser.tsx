import { FC } from "react";
import { UserList } from "./UserList";


export const FollowedUser:FC<{users:any}> = ({users}) =>{

    const modal = document.getElementById("followed_modal") as any;

    const openFollowedUserModal =() =>{
        modal.showModal();
    }
    const closeFollowedUserModal =() =>{
        modal.close();
    }

    return(
        <>
            <button onClick={openFollowedUserModal}>
                <b>{users.length}</b> フォロワー
            </button>

            <dialog id="followed_modal" className="w-full md:w-96 p-3 rounded-lg h-screen overflow-auto">

                <div className="relative w-full">
                    <div className="text-center py-2">フォロワー</div>
                    <button className="absolute top-1 right-1" onClick={closeFollowedUserModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {users.length == 0 && <div className="flex items-center justify-center h-screen">フォロワーはいません</div>}
                
                {users.map( (user:any) => (
                    
                    <div onClick={closeFollowedUserModal}>
                        <UserList img={user.profile_icon_img} name={user.name} id={user.personal_id} />     
                    </div>
                                   
                ))}                   
            </dialog>
        </>
    );
}