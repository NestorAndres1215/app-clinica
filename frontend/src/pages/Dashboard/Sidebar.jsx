import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Header con efecto "glass" usando Bootstrap */}
      <div className="bg-white bg-opacity-75 backdrop-blur-sm border-bottom p-4 text-center shadow-sm">
        <h4 className="fw-bold text-primary mb-1 d-flex align-items-center justify-content-center">
          <i className="fas fa-clinic-medical me-2"></i>
          ClínicaPro
        </h4>
        <small className="text-muted">Panel Admin</small>
      </div>

      {/* Navegación */}
      <Nav className="flex-column flex-grow-1 px-2 pt-3">
        {[
          { to: "/dashboard/especialidades", icon: "stethoscope", label: "Especialidades" },
          { to: "/dashboard/distritos", icon: "map-marker-alt", label: "Distritos" },
          { to: "/dashboard/medicos", icon: "user-md", label: "Médicos" },
          { to: "/dashboard/pacientes", icon: "user-injured", label: "Pacientes" },
          { to: "/dashboard/citas", icon: "calendar-alt", label: "Citas" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white px-3 py-2 mb-1 rounded-3 ${
                isActive ? "bg-white bg-opacity-25 text-white" : "bg-opacity-0"
              }`
            }
            style={{
              transition: "all 0.3s ease",
            }}
          >
            <i className={`fas fa-${item.icon} me-3`}></i>
            {item.label}
          </NavLink>
        ))}
      </Nav>

      {/* Footer */}
      <div className="border-top border-white border-opacity-25 px-3 py-3 mt-auto">
        <small className="d-flex align-items-center text-white">
          <i className="fas fa-shield-alt text-success me-2"></i>
          Sesión segura
        </small>
      </div>
    </div>
  );
}