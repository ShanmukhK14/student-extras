import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user, registeredEvents, registerEvent } = useAuth();

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  const isRegistered = registeredEvents.some((e) => e.id === Number(id));

  if (!event) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-glass">
        <h1 className="text-3xl font-bold text-white">{event.title}</h1>
        <p className="text-white/80 mt-3">{event.description}</p>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-3 rounded">
            <p className="text-white/70"><strong>Venue</strong></p>
            <p className="text-white">{event.venue}</p>
          </div>
          <div className="bg-white/5 p-3 rounded">
            <p className="text-white/70"><strong>Date</strong></p>
            <p className="text-white">{event.date}</p>
          </div>
          <div className="bg-white/5 p-3 rounded">
            <p className="text-white/70"><strong>Participants</strong></p>
            <p className="text-white">{event.participants?.length || 0}</p>
          </div>
        </div>

        <div className="mt-6">
          {!user ? (
            <p className="text-red-400">Login to register for this event.</p>
          ) : !isRegistered ? (
            <button onClick={() => registerEvent(event)} className="btn-primary">Register for Event</button>
          ) : (
            <button className="bg-red-500 text-white px-4 py-2 rounded">Registered</button>
          )}
        </div>
      </div>
    </div>
  );
}
