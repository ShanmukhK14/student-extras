import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 className="text-xl">Loading events...</h2>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-1">Venue: {event.venue}</p>
            <p className="text-sm text-gray-500">Date: {event.date}</p>

            <Link to={`/events/${event.id}`}>
  <button className="mt-4 block w-full bg-blue-600 text-white p-2 rounded">
    View Details
  </button>
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}
