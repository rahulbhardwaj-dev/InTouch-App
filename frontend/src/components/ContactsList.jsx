import { useEffect } from 'react';
import {useChatStore} from '../store/useChatStore.js';
import UserLoadingSkeleton from './UserLoadingSkeleton.jsx';

{/* <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}></div> */}

function ContactsList(){

    const {getAllContacts, allContacts , isUsersLoading, setSelectedUser} = useChatStore();

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts])

    if(isUsersLoading) return <UserLoadingSkeleton />

    return(
        <>
            {allContacts.map((contact) => (
                <div
                key={contact._id}
                className="bg-emerald-500/10 p-4 rounded-lg cursor-pointer hover:bg-emerald-500/20 transition-colors"
                onClick={() => setSelectedUser(contact)}
                >
                <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full">
                        <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
                    </div>
                    <h4 className="text-slate-200 font-medium truncate">{contact.fullName}</h4>
                </div>
                </div>
            ))}
        </>
    )
}
export default ContactsList;
