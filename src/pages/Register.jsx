import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    login(email); // mock register-login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center neon-bg">
      <div className="glass-card w-full max-w-md p-8 fade-up">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 px-3 py-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* EMAIL */}
          <input
            type="email"
            className="input-field"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className="input-field"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-white/70 cursor-pointer"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="btn-primary w-full py-3 text-lg">
            Register
          </button>
        </form>

        <p className="text-white/70 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-300 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
