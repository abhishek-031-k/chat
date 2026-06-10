import { Volume2, VolumeX } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ProfileHeader() {
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  
  // Safe Selectors for sound toggle
  const soundEnabled = useChatStore((state) => state.soundEnabled);
  const toggleSound = useChatStore((state) => state.toggleSound);

  const handleToggleSound = () => {
    if (typeof toggleSound === "function") {
      toggleSound();
    }
  };

  return (
    <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/40">
      <div className="flex items-center gap-3">
        <img
          src={authUser?.profilePic || "/avatar.png"}
          alt="Profile"
          className="size-10 rounded-full object-cover border-2 border-slate-600"
        />
        <div>
          <h3 className="font-semibold text-slate-200 text-sm">{authUser?.fullName}</h3>
          <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
            <span className="size-2 bg-cyan-400 rounded-full animate-pulse" /> Active
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleSound}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        <button
          onClick={logout}
          className="px-3 py-1.5 text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors border border-rose-500/20"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
