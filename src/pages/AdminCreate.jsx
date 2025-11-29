import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.email === "admin@gmail.com";

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-700 mt-2">Only admins can create events.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.date || !form.venue) {
      setError("Please fill all fields");
      return;
    }

    try {
      await api.post("/events", form);
      setSuccess("Event created successfully!");
      setError("");

      setTimeout(() => {
        navigate("/events");
      }, 1200);
    } catch {
      setError("Error creating event.");
    }
  };

  return (
    <div className="min-h-screen py-12 neon-bg">
      <div className="max-w-3xl mx-auto fade-up">
        
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-neon text-center mb-8">
          Create New Event
        </h1>

        {/* CARD */}
        <div className="glass-card p-8 card-neon">

          {error && (
            <div className="bg-red-500/25 text-red-300 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/25 text-green-300 px-4 py-2 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-6">

            {/* TITLE */}
            <div>
              <label className="form-label">Event Title</label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Hackathon 2025"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input-field min-h-[120px]"
                placeholder="Write a short description..."
              />
            </div>

            {/* DATE */}
            <div>
              <label className="form-label">Event Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* VENUE */}
            <div>
              <label className="form-label">Venue</label>
              <input
                name="venue"
                type="text"
                value={form.venue}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Auditorium Block - 1"
              />
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="form-label">Image URL (optional)</label>
              <input
                name="image"
                type="text"
                value={form.image}
                onChange={handleChange}
                className="input-field"
                placeholder="Paste event banner link here..."
              />
            </div>

            {/* SUBMIT */}
            <button type="submit" className="btn-primary w-full py-3 text-lg hover-lift">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
