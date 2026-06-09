import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useRef } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  // ✅ Zustand hook call standard format
  const store = useAuthStore();
  
  // ✅ Crucial Fix: Use a mutable reference to save the function instance 
  // to completely protect it from React 19 production variable tracking collapse
  const checkAuthRef = useRef(null);

  if (store && store.checkAuth) {
    checkAuthRef.current = store.checkAuth;
  }

  useEffect(() => {
    // Isolated local runtime call to prevent 'e is not a function' crash
    const executeAuth = async () => {
      if (checkAuthRef.current && typeof checkAuthRef.current === "function") {
        try {
          await checkAuthRef.current();
        } catch (err) {
          console.error("Auth check internal failure:", err);
        }
      }
    };
    executeAuth();
  }, []); // Run safely once on component layout mount

  // Safe checks for rendering states
  const isCheckingAuth = store ? store.isCheckingAuth : true;
  const authUser = store ? store.authUser : null;

  if (isCheckingAuth) return <PageLoader />;

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
