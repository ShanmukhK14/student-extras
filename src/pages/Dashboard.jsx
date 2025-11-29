import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, registeredEvents } = useAuth();
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then(res => {
        setEvents(res.data || []);
        // upcoming = next 3 by date
        const sorted = (res.data || []).slice().sort((a,b) => new Date(a.date) - new Date(b.date));
        setUpcoming(sorted.slice(0,3));
      })
      .catch(() => setEvents([]));
  }, []);

  const totalRegistered = registeredEvents.length;
  const totalEvents = events.length;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="grid md:grid-cols-3 gap-6">

        {/* PROFILE CARD */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full neon-border" />
            <div>
              <div className="text-lg font-bold text-gray-900">{user?.email || "Guest"}</div>
              <div className="text-sm text-gray-600 mt-1">Student</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">Events registered</div>
              <div className="font-semibold text-gray-900">{totalRegistered}</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">Total events</div>
              <div className="font-semibold text-gray-900">{totalEvents}</div>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/events" className="btn-primary w-full text-center">Browse events</Link>
          </div>
        </div>

        {/* STATS / QUICK */}
        <div className="md:col-span-2 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="card-glass p-4 text-center neon-border hover-lift">
              <div className="text-sm text-gray-600">Registered</div>
              <div className="text-2xl font-bold text-gray-900">{totalRegistered}</div>
            </div>

            <div className="card-glass p-4 text-center neon-border hover-lift">
              <div className="text-sm text-gray-600">Upcoming</div>
              <div className="text-2xl font-bold text-gray-900">{upcoming.length}</div>
            </div>

            <div className="card-glass p-4 text-center neon-border hover-lift">
              <div className="text-sm text-gray-600">Total Events</div>
              <div className="text-2xl font-bold text-gray-900">{totalEvents}</div>
            </div>
          </div>

          {/* UPCOMING EVENTS (timeline) */}
          <div className="card-glass p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <Link to="/events" className="text-indigo-700 font-medium">See all</Link>
            </div>

            <div className="mt-4 space-y-3">
              {upcoming.length === 0 ? (
                <div className="text-gray-600">No upcoming events</div>
              ) : (
                upcoming.map(ev => (
                  <div key={ev.id} className="flex justify-between items-center p-3 bg-white/80 rounded-md neon-border">
                    <div>
                      <div className="font-semibold text-gray-900">{ev.title}</div>
                      <div className="text-sm text-gray-600">{ev.date} • {ev.venue}</div>
                    </div>
                    <Link to={`/events/${ev.id}`} className="text-indigo-700 font-medium">View</Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* REGISTERED EVENTS GRID */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Registered Events</h3>

            {registeredEvents.length === 0 ? (
              <div className="text-gray-600">You haven’t registered for any events yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {registeredEvents.map(ev => (
                  <div key={ev.id} className="p-4 bg-white/90 rounded-md neon-outline">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-900">{ev.title}</div>
                        <div className="text-sm text-gray-600">{ev.date} • {ev.venue}</div>
                      </div>
                      <Link to={`/events/${ev.id}`} className="text-indigo-700 font-medium">Open</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
