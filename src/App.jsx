import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EditEmployee from "./pages/EditEmployee";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ marginRight: 12 }}>Gestor de Empleados</Link>
        <Link to="/new">Agregar empleado</Link>
      </nav>

      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<EditEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}
