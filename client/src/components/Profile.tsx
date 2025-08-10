import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface UserInfo {
    avator: string; // note: typically spelled "avatar"
    name: string;
    email: string;
}

interface ProfileWithPopupProps {
    userInfo: UserInfo;
    isLoading: boolean;
    logoutHandler: () => void;
}

const ProfileWithPopup: React.FC<ProfileWithPopupProps> = ({
    userInfo,
    isLoading,
    logoutHandler,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            {/* Avatar */}

            <img
                src={userInfo.avator}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition"
                onClick={() => setIsOpen(!isOpen)}
            />


            {/* Popup box */}
            {isOpen && (
                <div
                    ref={popupRef}
                    className="absolute md:-right-20 right-0  mt-2 w-48 bg-white border rounded shadow-lg z-50"
                >
                    <div className="p-4">
                        <div className="flex justify-between">
                            <img
                                src={userInfo.avator}
                                alt="User Avatar"
                                className="border border-gray-300  w-10 h-10 rounded-full cursor-pointer"
                            />
                            <Link to={"/updateProfile"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-2 hover:text-gray-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                            </Link>

                        </div>

                        <p className="font-semibold">{userInfo.name}</p>
                        <p className="text-sm text-gray-600">{userInfo.email}</p>
                        <button
                            disabled={isLoading}
                            type="button"
                            onClick={logoutHandler}
                            className={`mt-4 w-full py-2 px-4 border rounded text-white transition-colors ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black cursor-pointer hover:bg-gray-800"
                                }`}
                        >
                            {isLoading ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileWithPopup;
