import React from "react";
import { useState } from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";

import Admin from "./components/admin";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
    <ToastContainer   style={{ whiteSpace: "nowrap" }} />
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      {isLoggedIn && (
        <Route path="/admin/*" element={<Admin />} /> // Allow access to nested admin routes
      )}
    </Routes>
  </div>
  );
}

export default App;
