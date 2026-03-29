import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    // FIX: Changed to min-h-screen to ensure the background fills the viewport
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-900">
      
      {/* FIX: Removed fixed h-[800px] and h-[650px]. Used max-w-5xl for better width. */}
      <div className="relative w-full max-w-5xl">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row overflow-hidden">
            
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-6 md:p-12 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                  <p className="text-slate-400 text-sm">Login to access to your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label text-sm">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label text-sm">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn mt-2" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link to="/signup" className="auth-link text-sm">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="max-w-sm w-full">
                <img
                  src="/login.png"
                  alt="Login Illustration"
                  className="w-full h-auto object-contain opacity-90"
                />
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Connect anytime, anywhere</h3>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="auth-badge text-xs">Free</span>
                    <span className="auth-badge text-xs">Easy Setup</span>
                    <span className="auth-badge text-xs">Private</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;