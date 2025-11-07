import React, { useContext, useMemo, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

export default function EmployeeList() {
  const { empleados, loading, removeEmpleado } = useContext(EmployeeContext);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [toDelete, setToDelete] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return empleados.filter((e) => {
      if (filterEstado !== "Todos" && e.estado !== filterEstado) return false;
      if (!q) return true;
      return (
        e.nombre.toLowerCase().includes(q) ||
        e.puesto.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    });
  }, [empleados, search, filterEstado]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input
          placeholder="Buscar por nombre, puesto o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
          <option>Todos</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
        <Link to="/new">
          <button className="add-button">+ Nuevo</button>
        </Link>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th>Nombre</th>
            <th>Email</th>
            <th>Puesto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id} style={{ borderBottom: "1px solid #f1f1f1" }}>
              <td>{e.nombre}</td>
              <td>{e.email}</td>
              <td>{e.puesto}</td>
              <td>{e.estado}</td>
              <td>
                <Link to={`/edit/${e.id}`}>
                  <button style={{ marginRight: 6 }} className="edit-button">Editar</button>
                </Link>
                <button onClick={() => setToDelete(e)} className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        open={!!toDelete}
        title="Confirmar eliminación"
        onClose={() => setToDelete(null)}
        onConfirm={async () => {
          await removeEmpleado(toDelete.id);
          setToDelete(null);
        }}
      >
        ¿Eliminar a <strong>{toDelete?.nombre}</strong>?
      </ConfirmModal>
    </div>
  );
}
