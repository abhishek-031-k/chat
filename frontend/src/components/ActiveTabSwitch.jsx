import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  // 1. Zustand store se activeTab state aur use badalne wala function (setActiveTab) nikaalo
  const { activeTab, setActiveTab, getAllContacts, getMyChatPartners } = useChatStore();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // 2. EXTRA FIX: Jab tab switch ho, toh data bhi fetch karlo 
    // taaki wo "1 second blank" wala glitch kam se kam ho.
    if (tab === "contacts") {
      getAllContacts();
    } else {
      getMyChatPartners();
    }
  };

  return (
    <div className="flex p-2 gap-2 bg-slate-900/40 rounded-xl m-4 border border-slate-700/30">
      {/* CHATS BUTTON */}
      <button
        onClick={() => handleTabChange("chats")}
        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
        }`}
      >
        Chats
      </button>

      {/* CONTACTS BUTTON */}
      <button
        onClick={() => handleTabChange("contacts")}
        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;