import useKeyboardSound from "../hooks/useKeyboardSound.js";
import {useChatStore} from "../store/useChatStore.js";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput(){

    const { playRandomSound } = useKeyboardSound();
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);// Preview of the selected image

    const fileInputRef = useRef(null);// this is for triggering the file input click
    
    const {sendMessage, isSoundEnabled} = useChatStore();

    const handleSendMessage = (event) => {
        event.preventDefault();
        if(text.trim() === "" && !imagePreview) return;// Don't send empty messages
        if(isSoundEnabled){
            playRandomSound();
        }
        sendMessage({text: text.trim(), image: imagePreview});

        //reset input fields
        setText("");
        setImagePreview(null);

        if(fileInputRef.current){ // Reset file input
            fileInputRef.current.value = null;
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];// Get the selected file

        if(!file) return;

        if (!file.type.startsWith("image/")) { // Validate file type
        toast.error("Please select an image file");
        return;
        }

        const reader = new FileReader();// Read the file as Data URL
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    }
    
    const removeImage = () => {//if user doesn't want to send the selected image
        setImagePreview(null);
        if(fileInputRef.current){ // Reset file input
            fileInputRef.current.value = null;
        }
    }

    return(
        <div className="p-4 border-t border-slate-700/50">
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                <div className="relative">
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                    />
                    <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                    type="button"
                    >
                    <XIcon className="w-4 h-4" />
                    </button>
                </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-4">
                <input
                type="text"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    isSoundEnabled && playRandomSound();
                }}
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
                placeholder="Type your message..."
                />

                <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                />

                <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
                    imagePreview ? "text-emerald-500" : ""
                }`}
                >
                <ImageIcon className="w-5 h-5" />
                </button>
                <button
                type="submit"
                disabled={!text.trim() && !imagePreview}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg px-4 py-2 font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}

export default MessageInput;
