import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const [debugError, setDebugError] = useState(null);

  // ==========================================
  // CRITICAL CHECKPOINT 1: STORES & DEPENDENCIES
  // ==========================================
  console.log("=== [CHECKPOINT 1] DEPENDENCY TYPE CHECK ===");
  console.log("1. useAuthStore exists?", !!useAuthStore);
  console.log("2. Type of useAuthStore:", typeof useAuthStore);
  
  let store = null;
  try {
    if (typeof useAuthStore === "function") {
      store = useAuthStore();
      console.log("3. Store hook executed successfully. Store state:", store);
    } else {
      console.error("3. CRITICAL: useAuthStore is NOT a function! It is:", typeof useAuthStore);
    }
  } catch (err) {
    console.error("3. CRITICAL FAILURE during useAuthStore execution:", err);
    if (!debugError) setDebugError(`Store Crash: ${err.message}`);
  }

  const checkAuth = store ? store.checkAuth : null;
  const isCheckingAuth = store ? store.isCheckingAuth : false;
  const authUser = store ? store.authUser : null;

  console.log("4. checkAuth type:", typeof checkAuth);
  console.log("5. isCheckingAuth value:", isCheckingAuth);
  console.log("6. authUser status:", authUser);

  // ==========================================
  // CRITICAL CHECKPOINT 2: EXECUTE AUTH CHECK
  // ==========================================
  useEffect(() => {
    console.log("=== [CHECKPOINT 2] EFFECT TRIGGERED ===");
    if (checkAuth && typeof checkAuth === "function") {
      console.log("Initiating checkAuth() call...");
      checkAuth();
    } else {
      console.error("Cannot execute checkAuth. Type is:", typeof checkAuth);
      setDebugError(`checkAuth is ${typeof checkAuth}, expected function.`);
    }
  }, [checkAuth]);

  // ==========================================
  // CRITICAL CHECKPOINT 3: ROUTING & COMPONENTS
  // ==========================================
  console.log("=== [CHECKPOINT 3] COMPONENT RESOLUTION ===");
  console.log("ChatPage component template:", !!ChatPage);
  console.log("LoginPage component template:", !!LoginPage);
  console.log("SignUp component template:", !!SignUp);
  console.log("PageLoader component template:", !!PageLoader);

  // If a crash was caught during execution, render a bulletproof recovery screen with logs
  if (debugError) {
    return (
      <div className="min-h-screen bg-black text-red-500 p-8 font-mono flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">🚨 RUNTIME DEBUGGER CAUGHT ERROR:</h1>
        <div className="bg-zinc-900 text-zinc-300 p-6 rounded-lg max-w-2xl w-full border border-red-900 shadow-xl">
          <p className="text-red-400 font-bold mb-2">{debugError}</p>
          <hr className="border-zinc-800 my-4" />
          <p className="text-xs text-zinc-500">
            Check your browser console logs immediately. Look for [CHECKPOINT] tags to find exactly where the mapping broke.
          </p>
        </div>
      </div>
    );
  }

  if (isCheckingAuth) {
    console.log("Rendering PageLoader screen...");
    return <PageLoader />;
  }

  console.log("Rendering application core routes view layer...");
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
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
