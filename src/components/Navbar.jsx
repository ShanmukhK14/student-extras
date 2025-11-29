import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">Student Activities</Link>

          <div className="flex gap-6 text-lg">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/events" className="hover:text-blue-600">Events</Link>

            {!user && (
              <>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/register" className="hover:text-blue-600">Register</Link>
              </>
            )}

            {user && (
              <>
                <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
