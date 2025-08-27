import React from 'react'
import EmojiPickerPropup from "emoji-picker-react";
import{ LuImage, LuX} from "react-icons/lu";
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

const EmojiPickerPropup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className= "fex flex-col md:flex-ro items-start gap-5 mb-6">
            <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setIsOpen (true)}
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primart rounded-lg ">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12" />
                    ) : (
                        <LuImage/>

                    )}
                </div> 
                <p className="">{icon? "Change Icon" : "Pick Icon"} </p>
            </div>

            {isOpen && (
                <div className="relativew-7 h-7 flex items-center bg-white border border-gray-200 rounded-full absolute -tp-2 -right-2 z-10 cursor-poiner">
                    <button 
                    className=""
                    onClick={() => setIsOpen(false)}
                    >
                        <LuX/>
                
                    </button>

                    <EmojiPicker 
                    open={isOpen}
                    onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
                    />
        
        </div>
    )}
    </div>
    )}

    export default EmojiPickerPropup;


