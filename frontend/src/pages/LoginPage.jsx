import { useState } from "react";
import { Link } from "react-router";
import { 
  MessageCircleIcon, 
  MailIcon, 
  LoaderIcon, 
  LockIcon 
} from "lucide-react";

// Store & Components
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    // Outer page wrapper - Deep sleek tech theme with elegant radial ambient glows
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#0b0f19] overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Card Wrapper with responsive spacing and premium shadows */}
      <div className="relative w-full max-w-5xl z-10">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1527]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.4)]">
            
            {/* ==========================================
                FORM COLUMN - LEFT SIDE (Interactive Form)
                ========================================== */}
            <div className="w-full md:w-1/2 p-8 md:p-14 flex items-center justify-center md:border-r border-slate-800/60">
              <div className="w-full max-w-md">
                
                {/* Header Information */}
                <div className="text-center mb-10">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px] shadow-lg shadow-violet-500/10 mb-6 flex items-center justify-center">
                    <div className="w-full h-full rounded-[15px] bg-[#0d1527] flex items-center justify-center">
                      <MessageCircleIcon className="w-7 h-7 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 text-sm mt-2 font-medium">
                    Login to access to your account
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Email Input Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 auth-input-label">
                      Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                        <MailIcon className="w-5 h-5 auth-input-icon" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all duration-300 input"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 auth-input-label">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                        <LockIcon className="w-5 h-5 auth-input-icon" />
                      </div>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all duration-300 input"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Action Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full py-3.5 px-4 mt-6 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center auth-btn" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                  
                </form>

                {/* Form Footer Links */}
                <div className="mt-10 text-center">
                  <Link 
                    to="/signup" 
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 auth-link"
                  >
                    Don't have an account? <span className="text-cyan-400 font-semibold hover:underline">Sign Up</span>
                  </Link>
                </div>
                
              </div>
            </div>

            {/* ==========================================
                FORM ILLUSTRATION - RIGHT SIDE (Visual Panel)
                ========================================== */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 relative bg-slate-950/30">
              
              {/* Internal glow for illustration panel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />
              
              <div className="max-w-sm w-full z-10 flex flex-col items-center">
                
                {/* Illustration Asset Container */}
                <div className="w-full relative transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-cyan-500/10 blur-3xl rounded-3xl" />
                  <img
                    src="/login.png"
                    alt="Login Illustration"
                    className="w-full h-auto object-contain opacity-95 relative drop-shadow-[0_20px_50px_rgba(8,145,178,0.15)]"
                  />
                </div>
                
                {/* Copywriting & Badges */}
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    Connect anytime, anywhere
                  </h3>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                    <span className="px-3.5 py-1 text-xs font-semibold rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 shadow-sm backdrop-blur-md auth-badge">
                      Free
                    </span>
                    <span className="px-3.5 py-1 text-xs font-semibold rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 shadow-sm backdrop-blur-md auth-badge">
                      Easy Setup
                    </span>
                    <span className="px-3.5 py-1 text-xs font-semibold rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 shadow-sm backdrop-blur-md auth-badge">
                      Private
                    </span>
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
