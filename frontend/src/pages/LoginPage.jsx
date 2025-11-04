import { useState } from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import BorderAnimation from "../components/BorderAnimation.jsx"; // to wrap the sign up form in a border animation
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {

  const [formData, setFormData] = useState({email: "", password: ""})
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  }

  return (
   <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimation> 
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome back!</h2>
                  <p className="text-slate-400">Let’s get you InTouch again</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        className="input"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link"> {/* Link - will take us to the login page*/}
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-emerald-500">Stay Closer Than Ever</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Reliable</span>
                    <span className="auth-badge">Instant Setup</span>
                    <span className="auth-badge">End-to-End Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimation>
      </div>
    </div>
  )
}

export default LoginPage
