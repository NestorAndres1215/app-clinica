import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => navigate("/dashboard");

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Ícono grande centrado */}
        <div className="mb-4">
          <i
            className="fas fa-heartbeat text-primary"
            style={{ fontSize: "4.5rem" }}
          ></i>
        </div>

        {/* Título */}
        <h1
          className="display-5 fw-bold mb-3"
          style={{ color: "#2c3e50", lineHeight: "1.2" }}
        >
          Bienvenido a la Clínica
        </h1>

        {/* Subtítulo */}
        <p className="text-muted mb-4 fs-5">
          Tu salud, nuestra prioridad.
        </p>

        {/* Botón centrado con animación */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleStart}
          className="d-flex align-items-center justify-content-center mx-auto px-5 py-3 rounded-pill shadow-sm"
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            minWidth: "180px",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-4px)";
            e.target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
          }}
        >
          Iniciar
          <i className="fas fa-arrow-right ms-3"></i>
        </Button>

        {/* Pie de seguridad */}
        <div className="mt-4">
          <small className="text-muted">
            <i className="fas fa-shield-alt text-success me-1"></i>
            100% seguro y confidencial
          </small>
        </div>
      </div>
    </Container>
  );
}