import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  nombre: Yup.string().required("Nombre obligatorio"),
  email: Yup.string().email("Email inválido").required("Email obligatorio"),
  puesto: Yup.string().required("Puesto obligatorio"),
  estado: Yup.string().oneOf(["Activo", "Inactivo"]).required("Estado"),
});

export default function EmployeeForm({ initialValues, onSubmit }) {
  const defaults = {
    nombre: "",
    email: "",
    puesto: "",
    estado: "Activo",
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaults}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ maxWidth: 600 }}>
          <div style={{ marginBottom: 8 }}>
            <label>Nombre</label><br/>
            <Field name="nombre" placeholder="Juan Pérez" />
            <div style={{ color: "red" }}><ErrorMessage name="nombre" /></div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Email</label><br/>
            <Field name="email" placeholder="email@empresa.com" />
            <div style={{ color: "red" }}><ErrorMessage name="email" /></div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Puesto</label><br/>
            <Field name="puesto" placeholder="Desarrollador Frontend" />
            <div style={{ color: "red" }}><ErrorMessage name="puesto" /></div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Estado</label><br/>
            <Field as="select" name="estado">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Field>
            <div style={{ color: "red" }}><ErrorMessage name="estado" /></div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={isSubmitting} className="add-button">
              Guardar
            </button>
            <button type="button" onClick={() => window.history.back()} className="cancel-button">
              Cancelar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
