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
    // 1. Same wrapper as LoginPage: centers content and ensures background covers screen
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-900 overflow-hidden">
      
      {/* 2. Same structure as LoginPage: max-width for large screens, 
          but dynamic height (calc) to ensure it never overflows the window. */}
      <div className="relative w-full max-w-6xl h-[calc(100vh-4rem)] max-h-[800px]">
        <BorderAnimatedContainer>
          {/* 3. Ensure the internal layout fills the animated container perfectly */}
          <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
            
            {/* LEFT SIDE (Sidebar) */}
            <div className="w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col md:border-r border-slate-600/30">
              <ProfileHeader />
              <ActiveTabSwitch />

              {/* flex-1 + overflow-y-auto makes only the list scroll, not the page */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT SIDE (Chat Window) */}
            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
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