import { useChatStore } from "../store/useChatStore";
// ... your other imports (like icons, etc)

function ChatHeader() {
  // 1. Bring in setSelectedUser from your store
  const { selectedUser, setSelectedUser } = useChatStore(); 

  if (!selectedUser) return null;

  return (
    {/* Assuming your header has a wrapper div like this */}
    <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
      
      <div className="flex items-center gap-3">
        {/* 2. ADD THE BACK BUTTON HERE */}
        {/* It uses md:hidden so it ONLY shows on mobile screens */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="md:hidden mr-2 p-2 rounded-full hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {/* You can replace this with an SVG icon or Lucide React icon if you have them! */}
          <svg xmlns="http://www.w3000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Existing Profile Info */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full relative">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-slate-200">{selectedUser.fullName}</h3>
          <p className="text-xs text-slate-400">Online</p>
        </div>
      </div>

      {/* Existing close/options buttons on the right side... */}
    </div>
  );
}

export default ChatHeader;
