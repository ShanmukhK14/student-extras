import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRegister = async () => {
    if (!user) return alert("Please login first");

    if (event.participants.includes(user.email))
      return alert("Already registered");

    setSaving(true);

    const updated = {
      ...event,
      participants: [...event.participants, user.email]
    };

    await api.put(`/events/${id}`, updated);
    setEvent(updated);
    setSaving(false);
    alert("Registered successfully!");
  };

  const handleUnregister = async () => {
    if (!user) return;

    const updated = {
      ...event,
      participants: event.participants.filter(p => p !== user.email)
    };

    await api.put(`/events/${id}`, updated);
    setEvent(updated);
    alert("Unregistered successfully!");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="mt-2">{event.description}</p>

      <p className="mt-4"><b>Date:</b> {event.date}</p>
      <p><b>Venue:</b> {event.venue}</p>
      <p><b>Participants:</b> {event.participants.length}</p>

      {!event.participants.includes(user?.email) ? (
        <button 
          onClick={handleRegister}
          disabled={saving}
          className="mt-6 w-full bg-green-600 text-white p-2 rounded"
        >
          {saving ? "Registering..." : "Register"}
        </button>
      ) : (
        <button 
          onClick={handleUnregister}
          className="mt-6 w-full bg-red-600 text-white p-2 rounded"
        >
          Unregister
        </button>
      )}
    </div>
  );
}
