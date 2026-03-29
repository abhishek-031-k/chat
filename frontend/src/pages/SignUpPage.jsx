import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    // Changed: min-h-screen ensures it fills the viewport and centers content vertically
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-900">
      
      {/* Changed: Removed fixed h-[800px]. Added max-w-5xl for better proportions */}
      <div className="relative w-full max-w-5xl">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row overflow-hidden">
            
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-6 md:p-12 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-6">
                  <MessageCircleIcon className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-1">Create Account</h2>
                  <p className="text-slate-400 text-sm">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label text-sm">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

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
                  <button className="auth-btn mt-2" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link text-sm">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="max-w-sm w-full">
                <img
                  src="/signup.png"
                  alt="Illustration"
                  className="w-full h-auto object-contain opacity-80"
                />
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>
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

export default SignUpPage;