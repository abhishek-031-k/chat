import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ContactList() {
  // Safe Zustand Selectors mapped to actual store functions
  const getUsers = useChatStore((state) => state.getUsers);
  const users = useChatStore((state) => state.users) || [];
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const selectedUser = useChatStore((state) => state.selectedUser);
  
  const authUser = useAuthStore((state) => state.authUser);
  const onlineUsers = useAuthStore((state) => state.onlineUsers) || [];

  useEffect(() => {
    if (typeof getUsers === "function") {
      getUsers();
    }
  }, [getUsers]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const filteredContacts = users?.filter((user) => user?._id !== authUser?._id) || [];

  if (!isUsersLoading && filteredContacts.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      {filteredContacts.map((contact) => (
        <button
          key={contact?._id}
          onClick={() => setSelectedUser(contact)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-slate-800/50 transition-colors rounded-xl ${
            selectedUser?._id === contact?._id ? "bg-slate-800/80 ring-1 ring-slate-700" : ""
          }`}
        >
          <div className="relative">
            <img
              src={contact?.profilePic || "/avatar.png"}
              alt={contact?.fullName}
              className="size-12 object-cover rounded-full border border-slate-700"
            />
            {onlineUsers.includes(contact?._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-slate-900" />
            )}
          </div>
          <div className="text-left min-w-0 flex-1">
            <div className="font-medium text-slate-200 truncate">{contact?.fullName}</div>
            <div className="text-xs text-slate-500">
              {onlineUsers.includes(contact?._id) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ContactList;
