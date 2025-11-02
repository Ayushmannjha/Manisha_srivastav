import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Simple admin check
    if (email === "xyz@gmail.com" && password === "123") {
      localStorage.setItem("isAdmin", "true");
      setError(null);
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black text-white relative overflow-hidden px-4">
      {/* Floating particles (non-interactive) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-black/50 backdrop-blur-xl border border-purple-800/50 p-8 sm:p-10 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] w-full max-w-sm sm:max-w-md"
      >
        {/* Glowing gradient border (non-interactive) */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 opacity-30 blur-xl animate-pulse pointer-events-none -z-10" />

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 text-transparent bg-clip-text">
          Admin Portal
        </h1>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-purple-500 outline-none text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-purple-500 outline-none text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-purple-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 hover:from-purple-500 hover:to-amber-300 transition-all duration-300 p-3 rounded-lg font-semibold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} | Admin Access Only
        </p>
      </form>
    </div>
  );
}
