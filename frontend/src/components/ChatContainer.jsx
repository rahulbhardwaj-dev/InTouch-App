import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

function ChatContainer(){
    const {selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
    const {authUser} = useAuthStore();

    useEffect(() => {
        if(selectedUser){
            getMessagesByUserId(selectedUser._id);
        }
    }, [selectedUser, getMessagesByUserId]);

    return(
        <>
            <ChatHeader />
            <div className="flex-1 px-6 overflow-y-auto py-8">
                {messages.length  > 0  && !isMessagesLoading ?  
                <div className="max-w-3xl mx-auto space-y-6"> 
                    {messages.map( message => (
                        <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                            <div className={`chat-bubble relative ${message.senderId === authUser._id ? "bg-emerald-600 text-white" : "bg-slate-800 text-white-200"}`}>
                                {msg.image && (
                                    <img src={message.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                                )}
                                {message.text && <p className="mt-2">{message.text}</p>}
                                <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                    {new Date(message.createdAt).toISOString().slice(11, 16)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                     : isMessagesLoading ? <MessagesLoadingSkeleton /> : <NoChatHistoryPlaceholder name={selectedUser.fullName}/>}
            </div>

            <MessageInput />

        </>
    )
}
export default ChatContainer;
