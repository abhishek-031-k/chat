import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const [logs, setLogs] = useState([]);
  const store = useAuthStore();

  const addLog = (msg, data = "") => {
    const timestamp = new Date().toISOString().split("T")[1].slice(0, -1);
    const text = `[${timestamp}] ${msg} ${data ? JSON.stringify(data) : ""}`;
    console.log(text);
    setLogs((prev) => [...prev, text]);
  };

  // Phase 1: Identity mapping checks on evaluation
  if (logs.length === 0) {
    addLog("Evaluating App Core Matrix Configuration...");
    addLog("Dependency check -> useAuthStore exists?", !!useAuthStore);
    addLog("Dependency check -> ChatPage exists?", !!ChatPage);
    addLog("Dependency check -> LoginPage exists?", !!LoginPage);
    addLog("Dependency check -> PageLoader exists?", !!PageLoader);
  }

  const checkAuth = store ? store.checkAuth : null;
  const isCheckingAuth = store ? store.isCheckingAuth : false;
  const authUser = store ? store.authUser : null;

  useEffect(() => {
    addLog("Execution trigger inside useEffect loop");
    if (typeof checkAuth === "function") {
      addLog("Firing server endpoint validation -> checkAuth()");
      checkAuth();
    } else {
      addLog("CRITICAL: checkAuth evaluation failed. Type is:", typeof checkAuth);
    }
  }, [checkAuth]);

  // Dynamic log tracking during store updates
  useEffect(() => {
    addLog("Store update detected. current state ->", { isCheckingAuth, hasUser: !!authUser });
  }, [isCheckingAuth, authUser]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-cyan-400 p-6 font-mono flex flex-col justify-between">
        <PageLoader />
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg max-h-48 overflow-y-auto mt-4 text-xs">
          <p className="text-zinc-500 font-bold border-b border-slate-800 pb-1 mb-1">LIVE MOUNT SYSTEM DEPLOYMENT LOGS:</p>
          {logs.map((log, i) => <div key={i} className="py-0.5">{log}</div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Dynamic persistent debug panel overlay - press Ctrl+H to toggle if needed, currently always visible in bottom corner for verification */}
      <div className="fixed bottom-2 left-2 z-[99999] bg-black/90 text-[10px] text-zinc-400 p-2 rounded border border-zinc-800 max-w-xs font-mono select-none pointer-events-none opacity-40">
        App Lifecycle Shell Rendered | User: ${!!authUser}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
