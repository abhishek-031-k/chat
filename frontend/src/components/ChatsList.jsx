import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatPartners, chats = [], isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // 1. If we are loading, ONLY show the skeleton.
  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // 2. ONLY show placeholder if loading is done AND array is empty.
  if (!isUsersLoading && chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      {chats.map((chat) => (
        <button
          key={chat?._id}
          onClick={() => setSelectedUser(chat)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-slate-800/50 transition-colors rounded-xl ${
            selectedUser?._id === chat?._id ? "bg-slate-800/80 ring-1 ring-slate-700" : ""
          }`}
        >
          <div className="relative">
            <img
              src={chat?.profilePic || "/avatar.png"}
              alt={chat?.fullName}
              className="size-12 object-cover rounded-full border border-slate-700"
            />
            {onlineUsers.includes(chat?._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
            )}
          </div>
          <div className="text-left min-w-0">
            <div className="font-medium text-slate-200 truncate">{chat?.fullName}</div>
            <div className="text-xs text-slate-500">
              {onlineUsers.includes(chat?._id) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ChatsList;