import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.email === "admin@gmail.com";

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data));
  }, []);

  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;
    await api.delete(`/events/${id}`);
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">All Events</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card-glass flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{event.title}</h3>
              <p className="text-white/80 mt-2">{event.description}</p>
              <p className="text-white/60 mt-3 text-sm">Venue: {event.venue} • Date: {event.date}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to={`/events/${event.id}`} className="w-full text-center btn-primary">View Details</Link>
              {isAdmin && (
                <>
                  <Link to={`/admin/edit/${event.id}`} className="w-full text-center bg-yellow-400/90 text-white py-2 rounded-lg">Edit</Link>
                  <button onClick={() => deleteEvent(event.id)} className="w-full text-center bg-red-500/90 text-white py-2 rounded-lg">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
