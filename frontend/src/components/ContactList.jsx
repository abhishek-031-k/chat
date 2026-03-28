import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactsList() {
  const { getAllContacts, allContacts = [], isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  
  // 1. IMPORT AUTHUSER: Grab your own profile data from the store
  const { authUser, onlineUsers = [] } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // 2. THE FIX: Filter out your own ID from the contacts array
  const filteredContacts = allContacts.filter((contact) => contact?._id !== authUser?._id);

  // 3. Update the empty check to look at the filtered list
  if (!isUsersLoading && filteredContacts.length === 0) {
    return <div className="p-8 text-center text-slate-500">No contacts found</div>;
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      {/* 4. Map over the NEW filteredContacts array instead of allContacts */}
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
          <div className="text-left min-w-0">
            <div className="font-medium text-slate-200 truncate">{contact?.fullName}</div>
            <div className="text-xs text-slate-400">Available</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ContactsList;