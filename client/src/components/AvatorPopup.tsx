import React, { useState, useRef, useEffect } from "react";

interface AvatarPopupProps {
    preview: string;
    pickSuggestedAvatar: (url: string) => void;
    deleteAvator: () => void
}

const suggestedAvatars = [
    "https://avatar.iran.liara.run/public/1",
    "https://avatar.iran.liara.run/public/2",
    "https://avatar.iran.liara.run/public/3",
    "https://avatar.iran.liara.run/public/4",
    "https://avatar.iran.liara.run/public/5",
    "https://avatar.iran.liara.run/public/6",
    "https://avatar.iran.liara.run/public/7",
    "https://avatar.iran.liara.run/public/8",
    "https://avatar.iran.liara.run/public/9",
    "https://avatar.iran.liara.run/public/10",
];

const AvatarPopup: React.FC<AvatarPopupProps> = ({ preview, pickSuggestedAvatar, deleteAvator }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    const [deleteProfileClicked, setDeleteProfileClicked] = useState(false);

    return (
        <div className="relative inline-block ">
            {/* Avatar */}
            <img
                src={preview}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition"
                onClick={() => setIsOpen(!isOpen)}
            />

            {/* Popup box */}
            {isOpen && (
                <div
                    ref={popupRef}
                    className="absolute md:-right-90 mt-2 md:w-xl w-90 bg-gray-200 text-gray-400 border-gray-600 rounded  z-50 p-4"
                >
                    <h3 className="font-semibold mb-2">Pick  an Avator</h3>
                    <div className="flex justify-center items-center w-12 h-12 cursor-pointer">
                        <svg onClick={() => {
                            deleteAvator();
                            setDeleteProfileClicked(true);
                        }}
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-12  transition-all ${deleteProfileClicked ? "text-gray-800" : ""}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {suggestedAvatars.map((url) => (
                            <img
                                key={url}
                                src={url}
                                alt="Suggested Avatar"
                                className={`w-12 h-12 rounded-full cursor-pointer border-2 ${preview === url ? "border-gray-800" : "border-transparent"
                                    }`}
                                onClick={() => { pickSuggestedAvatar(url); setDeleteProfileClicked(false) }}
                            />
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default AvatarPopup;
