import React, { useContext, useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { EmployeeContext } from "../context/EmployeeContext";
import { useParams, useNavigate } from "react-router-dom";
import * as service from "../services/employeeService";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEmpleado, editEmpleado } = useContext(EmployeeContext);
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return setInitial(null);
    setLoading(true);
    service.getById(id)
      .then((data) => setInitial(data))
      .catch(() => alert("No se encontró el empleado"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values) {
    if (id) {
      await editEmpleado(id, values);
    } else {
      await addEmpleado(values);
    }
    navigate("/");
  }

  if (loading) return <p>Cargando empleado...</p>;

  return (
    <div>
      <h2>{id ? "Editar empleado" : "Nuevo empleado"}</h2>
      <EmployeeForm initialValues={initial} onSubmit={handleSubmit} />
    </div>
  );
}
