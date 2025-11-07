const BASE = "http://localhost:5000/empleados";

export async function getAll() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Error fetching empleados");
  return res.json();
}

export async function getById(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Empleado no encontrado");
  return res.json();
}

export async function createEmployee(payload) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creando empleado");
  return res.json();
}

export async function updateEmployee(id, payload) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error actualizando empleado");
  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error eliminando empleado");
  return true;
}
