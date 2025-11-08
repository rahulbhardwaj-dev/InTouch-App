import {useState,useRef} from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import {useAuthStore} from "../store/useAuthStore.js";
import {useChatStore} from "../store/useChatStore.js";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader(){

    const {logout, authUser,updateProfile } = useAuthStore();
    const {isSoundEnabled, toggleSound} = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null); // State to hold the selected image file

    const fileInputRef = useRef(null);//this is used to trigger the file input click

    const handleImgUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if(!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);// this will convert the image to base64 string

        reader.onloadend =  async () => {
            const base64String = reader.result; // Get the base64 string
            setSelectedImg(base64String);
            await updateProfile({profilePic: base64String});//update profile picture in the store
        };
    };

    return(
        <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"> 
                    <div className="avatar online">
                        <button className="size-14 rounder-full overflow-hidden relative group" onClick={() => fileInputRef.current.click()}>
                            <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="userImg" 
                            className="size-full object-cover" />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">Change</span>
                            </div>
                        </button>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImgUpload} className="hidden" />
                    </div>

                    {/* UserName and Online Status */}
                    <div>
                        <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
                        {authUser.fullName}
                        </h3>
                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>

                {/* Sound and Logout options */}

                <div className="flex gap-4 items-center">
                    {/* Logout Button */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={logout}
                    >
                        <LogOutIcon className="size-5" />
                    </button>

                    {/* SOUND TOGGLE BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => {
                        // play click sound before toggling
                        mouseClickSound.currentTime = 0; // reset to start
                        mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                        toggleSound();
                        }}>
                        {isSoundEnabled ? (
                        <Volume2Icon className="size-5" />
                        ) : (
                        <VolumeOffIcon className="size-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProfileHeader;
