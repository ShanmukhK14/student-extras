import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
       <Routes>
  <Route path="/" element={<h1 className="text-3xl font-bold">Home Page</h1>} />
  
  <Route path="/events" element={<Events />} />

  {/* NEW ROUTE FOR EVENT DETAILS */}
  <Route path="/events/:id" element={<EventDetails />} />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
  <Route path="/dashboard" element={<h1 className="text-3xl">Dashboard Page</h1>} />
</Routes>

      </div>
    </div>
  );
}

export default App;
