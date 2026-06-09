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
  
  const checkAuth = store ? store.checkAuth : null;
  const isCheckingAuth = store ? store.isCheckingAuth : false;
  const authUser = store ? store.authUser : null;

  useEffect(() => {
    if (typeof checkAuth === "function") {
      checkAuth();
    }
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  // ====================================================
  // 100% BULLETPROOF RUNTIME ELEMENT RESOLVER
  // ====================================================
  // React 19 + Vite 8 minifier loops se bachne ke liye 
  // hum explicit functions banakar components inject karenge.
  const renderChatPage = () => {
    if (!ChatPage || typeof ChatPage !== "function") {
      return <div className="text-white p-4">ChatPage component loading error</div>;
    }
    return authUser ? <ChatPage /> : <Navigate to="/login" replace />;
  };

  const renderLoginPage = () => {
    if (!LoginPage || typeof LoginPage !== "function") {
      return <div className="text-white p-4">LoginPage component loading error</div>;
    }
    return !authUser ? <LoginPage /> : <Navigate to="/" replace />;
  };

  const renderSignUpPage = () => {
    if (!SignUp || typeof SignUp !== "function") {
      return <div className="text-white p-4">SignUp component loading error</div>;
    }
    return !authUser ? <SignUp /> : <Navigate to="/" replace />;
  };

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route path="/" element={renderChatPage()} />
        <Route path="/login" element={renderLoginPage()} />
        <Route path="/signup" element={renderSignUpPage()} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
