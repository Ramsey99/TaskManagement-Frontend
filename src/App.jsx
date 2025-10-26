import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import Users from "./components/Users";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/forgotPass" element={<ForgotPassword />} />
        <Route path="/resetPass/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
