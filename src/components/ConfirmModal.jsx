import React from "react";

export default function ConfirmModal({ open, onClose, onConfirm, title, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center",
      justifyContent: "center", background: "rgba(0,0,0,0.4)"
    }}>
      <div style={{ background: "#fff", padding: 16, borderRadius: 8, width: 400 }}>
        <h3>{title}</h3>
        <div style={{ margin: "12px 0" }}>{children}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
