import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore.js"; 
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsPending(true);

  try {
    await login(formData); // assuming login returns a promise
    setIsPending(false);
    navigate("/");// successful login
  } catch (err) {
    setError(err.message || "Wrong credentials!"); // show error
    setIsPending(false); // stop spinner
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('cursor-background-img.png')" }}>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/90"></div>

      <div className="relative max-w-5xl w-full">
        {/* Combined Big Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* Left Section - Form */}
            <div className="p-10 lg:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-lg">
                  Sign in to continue your interview preparation
                </p>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 text-sm">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-lg"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-lg"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl px-8 py-4 rounded-xl transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 mt-4"
                  disabled={isPending || isLoggingIn}
                >
                  {isPending || isLoggingIn ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 mt-6 text-lg">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-blue-600 hover:underline font-medium">
                    Create one
                  </a>
                </p>
              </form>
            </div>

            {/* Right Section - Content */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-10 lg:p-12 flex flex-col justify-center">
              <div className="text-center max-w-md mx-auto">
                
                {/* Icon */}
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Continue Your Journey
                </h2>
                
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Pick up where you left off and master your interview skills with AI-powered practice.
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-700 text-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    Resume your progress tracking
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    Access personalized feedback
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    Continue mock interviews
                  </div>
                  <div className="flex items-center text-gray-700 text-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    Track your improvement
                  </div>
                </div>

                {/* Success Metric */}
                <div className="bg-white/60 rounded-xl p-6 border border-white/80">
                  <div className="text-2xl font-bold text-blue-600 mb-2">10k+ Developers</div>
                  <p className="text-gray-600 text-sm">
                    Have improved their skills with our platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}