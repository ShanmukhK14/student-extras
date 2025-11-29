import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.email === "admin@gmail.com";

  const linkClass = (path) =>
    `px-3 py-2 rounded-md font-medium ${
      location.pathname === path
        ? "bg-white/60 text-gray-900 shadow"
        : "text-gray-700 hover:bg-white/50"
    } transition`;

  return (
    <nav className="max-w-6xl mx-auto flex items-center justify-between py-5">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full shadow-md"
          style={{
            background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
          }}
        />
        <div>
          <div className="font-extrabold text-xl text-gray-900 heading-glow">
            Student Activities
          </div>
          <div className="text-sm text-gray-600">Portal</div>
        </div>
      </Link>

      {/* Menu Links */}
      <div className="flex items-center gap-4">
        <Link className={linkClass("/")} to="/">Home</Link>
        <Link className={linkClass("/events")} to="/events">Events</Link>

        {user && (
          <Link className={linkClass("/dashboard")} to="/dashboard">
            Dashboard
          </Link>
        )}

        {isAdmin && (
          <Link className={linkClass("/admin/create")} to="/admin/create">
            Admin
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
