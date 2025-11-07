import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { EmployeeProvider } from "./context/EmployeeContext";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

