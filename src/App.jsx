import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import AdminCreate from "./pages/AdminCreate";
import AdminEdit from "./pages/AdminEdit";
import Home from "./pages/Home";
 
function App() {
  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
       <Routes>
  <Route path="/" element={<Home />} />

  
  <Route path="/events" element={<Events />} />

  {/* NEW ROUTE FOR EVENT DETAILS */}
  <Route path="/events/:id" element={<EventDetails />} />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/admin/create" element={<AdminCreate />} />
  <Route path="/admin/edit/:id" element={<AdminEdit />} />


</Routes>

      </div>
    </div>
  );
}

export default App;
