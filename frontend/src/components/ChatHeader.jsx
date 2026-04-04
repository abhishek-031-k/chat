import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react"; 
import { useAuthStore } from "../store/useAuthStore";
import ImageModal from "./ImageModal"; 

function ChatHeader() {
  const { selectedUser, setSelectedUser, activeTab } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  if (!selectedUser) {
    return (
      <div className="w-full h-[72px] flex items-center px-6 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-md">
        <h2 className="text-slate-200 font-semibold text-lg capitalize tracking-tight">
          {activeTab}
        </h2>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedUser?._id);
  const profilePicUrl = selectedUser.profilePic || "/avatar.png";

  return (
    <>
      <div className="w-full h-[72px] flex items-center justify-between px-6 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-10">
        
        {/* Mobile Back Button (Optional: Add this if you want a back arrow on the left for phones) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSelectedUser(null)}
            className="md:hidden p-2 -ml-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <div 
            className="relative cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setFullscreenImage(profilePicUrl)}
          >
            <div className="size-10 rounded-full overflow-hidden border border-slate-700">
              <img 
                src={profilePicUrl} 
                alt={selectedUser.fullName} 
                className="size-full object-cover"
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="text-slate-200 font-medium leading-none mb-1">
              {selectedUser.fullName}
            </h3>
            <p className={`text-[11px] font-medium uppercase tracking-wider ${isOnline ? "text-green-500" : "text-slate-500"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <button 
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all active:scale-95"
            title="Close Chat"
          >
            <XIcon className="size-5" />
          </button>
        </div>
      </div>

  
      {fullscreenImage && (
        <ImageModal 
          imageUrl={fullscreenImage} 
          onClose={() => setFullscreenImage(null)} 
        />
      )}
    </>
  );
}

export default ChatHeader;
