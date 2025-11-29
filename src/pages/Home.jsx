import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const { user } = useAuth();
  const [topEvents, setTopEvents] = useState([]);

  // Fetch Top Events (first 3 events)
  useEffect(() => {
    api.get("/events")
      .then(res => setTopEvents(res.data.slice(0, 3)))
      .catch(() => setTopEvents([]));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12">

      {/* ================= HERO SECTION ================= */}
      <section className="fade-up text-center md:text-left mb-16">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            Discover & Join
            <br />
            <span className="text-neon">Student Activities</span>
          </h1>

          <p className="text-gray-700 text-lg max-w-xl">
            Explore campus events, register instantly, and track participation —
            all inside one clean and modern student activity portal.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <Link to="/events" className="btn-primary hover-lift">Explore Events</Link>
            {!user ? (
              <Link to="/register" className="btn-secondary hover-lift">Get Started</Link>
            ) : (
              <Link to="/dashboard" className="btn-secondary hover-lift">Dashboard</Link>
            )}
          </div>
        </div>
      </section>


      {/* ================= TOP EVENTS ================= */}
      <section className="mt-10 fade-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Events</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {topEvents.map(ev => (
            <div key={ev.id} className="card-glass card-neon p-6 hover-lift">

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{ev.description}</p>
                </div>
                <div className="badge-neon">Event</div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-700">{ev.date}</span>
                <Link to={`/events/${ev.id}`} className="text-indigo-700 font-medium">View →</Link>
              </div>

            </div>
          ))}

          {topEvents.length === 0 && (
            <p className="text-gray-600">No events found. Add some events in db.json.</p>
          )}
        </div>
      </section>


      {/* ================= FEATURED CAMPUS HIGHLIGHTS ================= */}
      <section className="mt-20 fade-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Featured Campus Highlights
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="card-glass hover-lift p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Vibrant Student Clubs</h3>
              <p className="text-sm text-gray-600 mt-1">
                Join tech, cultural, and sports clubs — grow skills & leadership.
              </p>
            </div>
          </div>

          <div className="card-glass hover-lift p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Campus Events Weekly</h3>
              <p className="text-sm text-gray-600 mt-1">
                Workshops, hackathons, seminars — new opportunities every week.
              </p>
            </div>
          </div>

          <div className="card-glass hover-lift p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 shadow-lg"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Track Achievements</h3>
              <p className="text-sm text-gray-600 mt-1">
                See your event participation & achievements in one dashboard.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
