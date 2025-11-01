import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container, Navbar, Nav, NavbarBrand } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar fijo */}
      <div
        className="position-sticky top-0"
        style={{
          width: "240px",
          height: "100vh",
          overflowY: "auto",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header fijo */}
        <Navbar
          bg="white"
          className="shadow-sm border-bottom px-4 py-3"
          style={{ zIndex: 1000 }}
        >
          <NavbarBrand className="fw-bold text-primary">
            <i className="fas fa-tachometer-alt me-2"></i>
            Dashboard Administrativo
          </NavbarBrand>

          <Nav className="ms-auto align-items-center">
            <span className="text-muted me-3">
              <i className="fas fa-user-circle me-1"></i>
              Admin
            </span>
            <button className="btn btn-outline-danger btn-sm">
              <i className="fas fa-sign-out-alt"></i> Salir
            </button>
          </Nav>
        </Navbar>

        {/* Contenido dinámico con scroll */}
        <Container fluid className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </Container>
      </div>
    </div>
  );
}