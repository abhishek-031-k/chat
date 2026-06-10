import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  // Zustand v5 safe selectors without triggering infinite loops
  const getUsers = useChatStore((state) => state.getUsers);
  const users = useChatStore((state) => state.users) || [];
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const selectedUser = useChatStore((state) => state.selectedUser);
  
  // Safe extraction for Auth Store
  const authUser = useAuthStore((state) => state.authUser);
  const onlineUsers = useAuthStore((state) => state.onlineUsers) || [];

  useEffect(() => {
    if (typeof getUsers === "function") {
      getUsers();
    }
  }, [getUsers]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // Filter out your own ID from the 'users' array
  const filteredChats = users?.filter((user) => user?._id !== authUser?._id) || [];

  // Update the empty check to look at the NEW filtered list
  if (!isUsersLoading && filteredChats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      {filteredChats.map((chat) => (
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
