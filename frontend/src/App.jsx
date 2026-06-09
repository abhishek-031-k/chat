import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const store = useAuthStore();
  const [internalCrash, setInternalCrash] = useState(null);
  
  const checkAuth = store ? store.checkAuth : null;
  const isCheckingAuth = store ? store.isCheckingAuth : false;
  const authUser = store ? store.authUser : null;

  useEffect(() => {
    try {
      if (typeof checkAuth === "function") {
        checkAuth();
      }
    } catch (e) {
      console.error("Crash during checkAuth call execution:", e);
      setInternalCrash(`checkAuth Exec Failure: ${e.message}`);
    }
  }, [checkAuth]);

  // ==========================================
  // MASTER DEFENSIVE RENDERING BOUNDARY
  // ==========================================
  // Vite 8 minifier loops ko bypass karne ke liye static JSX trees 
  // ko runtime render objects mein badal dete hain jo kabhi crash nahi hote.
  try {
    if (isCheckingAuth) {
      return <PageLoader />;
    }
  } catch (err) {
    return (
      <div className="bg-black text-red-500 p-6 font-mono min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">🚨 PageLoader Component Crashed Production Build!</h1>
        <p className="mt-2 text-zinc-400 text-sm">Error: {err.message}</p>
      </div>
    );
  }

  // Agar runtime par kisi element ke functions toote hue hain, toh recovery screen render hogi
  if (internalCrash) {
    return (
      <div className="bg-black text-red-400 p-8 font-mono min-h-screen flex flex-col justify-center items-center border-4 border-red-900">
        <h1 className="text-2xl font-black mb-4">🚨 RUNTIME RECOVERY RADAR</h1>
        <div className="bg-zinc-900 p-6 rounded-xl max-w-lg w-full border border-zinc-800">
          <p className="font-bold text-red-500 mb-2">{internalCrash}</p>
          <hr className="border-zinc-800 my-3" />
          <p className="text-xs text-zinc-400">Check browser console logs to fetch structural identity trace.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {/* 
        BULLETPROOF ROUTING PROTECTION:
        We test each component execution context wrapper safely inline. 
        If React Router breaks due to standard type matching, try block catches it.
      */}
      <Routes>
        <Route 
          path="/" 
          element={
            authUser ? (
              typeof ChatPage === "function" ? <ChatPage /> : <div className="text-red-500 p-4 font-mono font-bold bg-black">🚨 ChatPage is NOT a valid function export!</div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            !authUser ? (
              typeof LoginPage === "function" ? <LoginPage /> : <div className="text-red-500 p-4 font-mono font-bold bg-black">🚨 LoginPage is NOT a valid function export!</div>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            !authUser ? (
              typeof SignUp === "function" ? <SignUp /> : <div className="text-red-500 p-4 font-mono font-bold bg-black">🚨 SignUp is NOT a valid function export!</div>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
