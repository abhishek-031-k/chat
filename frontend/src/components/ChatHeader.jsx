import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, activeTab } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // 1. ESCAPE KEY LOGIC: Close chat on 'Esc'
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  // 2. EMPTY STATE: If no user is selected, show the Tab Name
  if (!selectedUser) {
    return (
      <div className="w-full h-[72px] flex items-center px-6 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-md">
        <h2 className="text-slate-200 font-semibold text-lg capitalize tracking-tight">
          {activeTab}
        </h2>
      </div>
    );
  }

  // 3. ACTIVE CHAT STATE: Show Selected User Info
  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="w-full h-[72px] flex items-center justify-between px-6 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* AVATAR SECTION */}
        <div className="relative">
          <div className="size-10 rounded-full overflow-hidden border border-slate-700">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName} 
              className="size-full object-cover"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
          )}
        </div>

        {/* USER DETAILS */}
        <div className="flex flex-col">
          <h3 className="text-slate-200 font-medium leading-none mb-1">
            {selectedUser.fullName}
          </h3>
          <p className={`text-[11px] font-medium uppercase tracking-wider ${isOnline ? "text-green-500" : "text-slate-500"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
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
  );
}

export default ChatHeader;