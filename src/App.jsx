import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AdminEquipment from "./pages/AdminEquipment";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/equipment" element={<AdminEquipment />} />
        <Route path="/admin/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
