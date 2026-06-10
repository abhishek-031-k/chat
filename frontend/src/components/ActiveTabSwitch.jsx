import { MessageSquare, Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  // Safe Zustand Selectors
  const activeTab = useChatStore((state) => state.activeTab) || "chats";
  const setActiveTab = useChatStore((state) => state.setActiveTab);

  const handleTabChange = (tab) => {
    if (typeof setActiveTab === "function") {
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-b border-slate-700/50 bg-slate-800/20">
      <button
        onClick={() => handleTabChange("chats")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
          activeTab === "chats"
            ? "bg-slate-700 text-cyan-400 shadow-sm"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        Chats
      </button>

      <button
        onClick={() => handleTabChange("contacts")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
          activeTab === "contacts"
            ? "bg-slate-700 text-cyan-400 shadow-sm"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
      >
        <Users className="w-4 h-4" />
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
