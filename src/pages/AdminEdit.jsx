import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ title: "", description: "", date: "", venue: "" });

  useEffect(() => {
    api.get(`/events/${id}`).then(res => setEvent(res.data));
  }, [id]);

  const handleChange = (e) => setEvent({...event, [e.target.name]: e.target.value});

  const save = async (e) => {
    e.preventDefault();
    await api.put(`/events/${id}`, event);
    navigate("/events");
  };

  return (
    <div className="max-w-lg mx-auto card-glass">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Event</h1>
      <form onSubmit={save} className="space-y-4">
        <input name="title" value={event.title} onChange={handleChange} className="w-full p-3 rounded border bg-white/10 text-white" required />
        <textarea name="description" value={event.description} onChange={handleChange} className="w-full p-3 rounded border bg-white/10 text-white" required />
        <input name="date" value={event.date} onChange={handleChange} type="date" className="w-full p-3 rounded border bg-white/10 text-white" required />
        <input name="venue" value={event.venue} onChange={handleChange} className="w-full p-3 rounded border bg-white/10 text-white" required />
        <button className="btn-secondary w-full">Save changes</button>
      </form>
    </div>
  );
}
