import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import ViewEvent from "./components/ViewEvent";
import Checkout from "./components/Checkout";
import { useAuth } from "./helper/authContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected route for viewing event details */}
        <Route
          path="/event/:eventId"
          element={
            <ProtectedRoute>
              <ViewEvent />
            </ProtectedRoute>
          }
        />

        {/* Public route for checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper component to protect routes that require authentication
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default App;
