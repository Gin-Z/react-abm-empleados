import React, { createContext, useEffect, useState } from "react";
import * as service from "../services/employeeService";
import { toast } from "react-toastify";

export const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await service.getAll();
      setEmpleados(data);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar los empleados");
    } finally {
      setLoading(false);
    }
  }

  async function addEmpleado(payload) {
    try {
      const nuevo = await service.createEmployee(payload);
      setEmpleados((s) => [...s, nuevo]);
      toast.success("Empleado creado");
    } catch (err) {
      console.error(err);
      toast.error("Error al crear empleado");
      throw err;
    }
  }

  async function editEmpleado(id, payload) {
    try {
      const updated = await service.updateEmployee(id, payload);
      setEmpleados((s) => s.map((e) => (e.id === id ? updated : e)));
      toast.success("Empleado actualizado");
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar");
      throw err;
    }
  }

  async function removeEmpleado(id) {
    try {
      await service.deleteEmployee(id);
      setEmpleados((s) => s.filter((e) => e.id !== id));
      toast.success("Empleado eliminado");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar");
      throw err;
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        empleados,
        loading,
        load,
        addEmpleado,
        editEmpleado,
        removeEmpleado,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
