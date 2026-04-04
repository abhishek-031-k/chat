import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-900 overflow-hidden">
      <div className="relative w-full max-w-6xl h-[calc(100vh-4rem)] max-h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex overflow-hidden">
            
            {/* LEFT SIDE (Sidebar) */}
            {/* FIX: Hide on mobile (hidden) IF a chat is selected. Always show on desktop (md:flex) */}
            <div className={`
              w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex-col md:border-r border-slate-600/30
              ${selectedUser ? "hidden md:flex" : "flex"}
            `}>
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT SIDE (Chat Window) */}
            {/* FIX: Hide on mobile (hidden) IF NO chat is selected. Always show on desktop (md:flex) */}
            <div className={`
              flex-1 flex-col bg-slate-900/50 backdrop-blur-sm
              ${!selectedUser ? "hidden md:flex" : "flex"}
            `}>
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </div>
            
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;
