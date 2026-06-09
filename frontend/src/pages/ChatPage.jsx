import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";

// Saare components ke raw imports
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const [componentError, setComponentError] = useState(null);

  // ========================================================
  // CRITICAL DEBUG: Checking which component is broken
  // ========================================================
  console.log("=== [CHATPAGE] RUNTIME SUB-COMPONENT CHECK ===");
  console.log("1. BorderAnimatedContainer exists?", !!BorderAnimatedContainer, typeof BorderAnimatedContainer);
  console.log("2. ProfileHeader exists?", !!ProfileHeader, typeof ProfileHeader);
  console.log("3. ActiveTabSwitch exists?", !!ActiveTabSwitch, typeof ActiveTabSwitch);
  console.log("4. ChatsList exists?", !!ChatsList, typeof ChatsList);
  console.log("5. ContactList exists?", !!ContactList, typeof ContactList);
  console.log("6. ChatContainer exists?", !!ChatContainer, typeof ChatContainer);
  console.log("7. NoConversationPlaceholder exists?", !!NoConversationPlaceholder, typeof NoConversationPlaceholder);

  // Safely handling Zustand setup
  let storeData = { activeTab: "chats", selectedUser: null };
  try {
    const store = useChatStore();
    if (store) {
      storeData.activeTab = store.activeTab;
      storeData.selectedUser = store.selectedUser;
    }
  } catch (err) {
    console.error("Crash during useChatStore call:", err);
  }

  const { activeTab, selectedUser } = storeData;

  // Catching if any core UI wrapper layout evaluates to a non-function template string/undefined
  useEffect(() => {
    if (!BorderAnimatedContainer || typeof BorderAnimatedContainer !== "function") {
      setComponentError("BorderAnimatedContainer is missing or not exported correctly.");
    } else if (!ProfileHeader || typeof ProfileHeader !== "function") {
      setComponentError("ProfileHeader is missing or not exported correctly.");
    } else if (!ActiveTabSwitch || typeof ActiveTabSwitch !== "function") {
      setComponentError("ActiveTabSwitch is missing or not exported correctly.");
    }
  }, []);

  if (componentError) {
    return (
      <div className="min-h-screen bg-black text-amber-500 p-8 font-mono flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold mb-4">⚠️ CHATPAGE DIAGNOSTIC CATCH:</h1>
        <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl max-w-xl w-full border border-amber-900">
          <p className="text-amber-400 font-bold">{componentError}</p>
          <p className="text-xs text-zinc-500 mt-4">Check browser console for actual object types mapping trace.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-900 overflow-hidden">
      <div className="relative w-full max-w-6xl h-[calc(100vh-4rem)] max-h-[800px]">
        
        {/* Render standard container if template fails production runtime compilation */}
        {typeof BorderAnimatedContainer === "function" ? (
          <BorderAnimatedContainer>
            <div className="w-full h-full flex overflow-hidden">
              
              {/* LEFT SIDE (Sidebar) */}
              <div className={`w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex-col md:border-r border-slate-600/30 ${selectedUser ? "hidden md:flex" : "flex"}`}>
                {typeof ProfileHeader === "function" ? <ProfileHeader /> : <div className="p-4 text-white">Profile Header Error</div>}
                {typeof ActiveTabSwitch === "function" ? <ActiveTabSwitch /> : null}

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {activeTab === "chats" ? (
                    typeof ChatsList === "function" ? <ChatsList /> : <div className="text-white">ChatsList Missing</div>
                  ) : (
                    typeof ContactList === "function" ? <ContactList /> : <div className="text-white">ContactList Missing</div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE (Chat Window) */}
              <div className={`flex-1 flex-col bg-slate-900/50 backdrop-blur-sm ${!selectedUser ? "hidden md:flex" : "flex"}`}>
                {selectedUser ? (
                  typeof ChatContainer === "function" ? <ChatContainer /> : <div className="text-white">ChatContainer Missing</div>
                ) : (
                  typeof NoConversationPlaceholder === "function" ? <NoConversationPlaceholder /> : <div className="text-white">Placeholder Missing</div>
                )}
              </div>
              
            </div>
          </BorderAnimatedContainer>
        ) : (
          /* Safe Fallback Panel if wrapper container layout completely causes the 'e is not a function' break */
          <div className="w-full h-full flex overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1527]/80 backdrop-blur-xl shadow-2xl">
            <div className="w-full md:w-80 bg-slate-800/50 flex-col md:border-r border-slate-600/30 flex">
              {typeof ProfileHeader === "function" && <ProfileHeader />}
              {typeof ActiveTabSwitch === "function" && <ActiveTabSwitch />}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === "chats" ? typeof ChatsList === "function" && <ChatsList /> : typeof ContactList === "function" && <ContactList />}
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-slate-900/50">
              {selectedUser ? typeof ChatContainer === "function" && <ChatContainer /> : typeof NoConversationPlaceholder === "function" && <NoConversationPlaceholder />}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ChatPage;
