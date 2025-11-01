import { useState, useEffect } from "react";
import {
  getEspecialidades,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
} from "../../services/especialidadService";
import DataTable from "../../components/Table";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState({
    codesp: "",
    nomesp: "",
    costo: "",
  });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getEspecialidades();
      setEspecialidades(res.data || []);
    } catch (err) {
      setError("Error al cargar especialidades. Intente más tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setCurrent({
      codesp: "",
      nomesp: "",
      costo: "",
    });
    setError("");
  };

  const handleSave = async () => {
    if (!current.nomesp || !current.costo) {
      setError("Complete nombre y costo (*)");
      return;
    }

    if (parseFloat(current.costo) <= 0) {
      setError("El costo debe ser mayor a 0");
      return;
    }

    setLoading(true);
    try {
      if (current.codesp) {
        await updateEspecialidad(current.codesp, current);
      } else {
        await createEspecialidad(current);
      }
      await fetchData();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError("Error al guardar. Verifique los datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`¿Eliminar la especialidad "${row.nomesp}"?`)) return;

    setLoading(true);
    try {
      await deleteEspecialidad(row.codesp);
      await fetchData();
    } catch (err) {
      alert("Error al eliminar.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setCurrent(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const columns = [
    { key: "codesp", label: "Código", icon: "fas fa-hashtag" },
    { key: "nomesp", label: "Nombre", icon: "fas fa-stethoscope", filterable: true },
    {
      key: "costo",
      label: "Costo",
      icon: "fas fa-dollar-sign",
      render: (row) => `S/ ${parseFloat(row.costo).toFixed(2)}`,
      filterable: true,
    },
  ];

  return (
    <div
      className="p-4 rounded-4"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        {/* Header */}
        <div className="card-header bg-white bg-opacity-10 py-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0 fw-bold text-white d-flex align-items-center">
              <i className="fas fa-stethoscope me-3"></i>
              Gestión de Especialidades
            </h3>
            <Button
              variant="light"
              className="d-flex align-items-center shadow-sm"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Nueva Especialidad
            </Button>
          </div>
        </div>

        {/* Contenido */}
        <div className="card-body p-4 bg-white bg-opacity-95">
          {error && (
            <Alert variant="danger" className="d-flex align-items-center">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          )}

          {loading && !showModal ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Cargando especialidades...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={especialidades}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              title=""
              itemsPerPage={6}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Header
          closeButton
          className="bg-primary text-white border-0"
        >
          <Modal.Title className="d-flex align-items-center">
            <i className="fas fa-stethoscope me-2"></i>
            {current.codesp ? "Editar" : "Nueva"} Especialidad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          {error && (
            <Alert variant="warning" className="small">
              {error}
            </Alert>
          )}
          <Form>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-hashtag text-primary me-1"></i>
                    Código
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.codesp}
                    onChange={(e) =>
                      setCurrent({ ...current, codesp: e.target.value })
                    }
                    disabled={!!current.codesp}
                    placeholder="Automático"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-stethoscope text-primary me-1"></i>
                    Nombre *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.nomesp}
                    onChange={(e) =>
                      setCurrent({ ...current, nomesp: e.target.value })
                    }
                    placeholder="Cardiología"
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-dollar-sign text-primary me-1"></i>
                    Costo por Consulta *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={current.costo}
                    onChange={(e) =>
                      setCurrent({ ...current, costo: e.target.value })
                    }
                    placeholder="150.00"
                    min="0"
                    step="0.01"
                  />
                  <Form.Text className="text-muted">
                    Ingrese el costo en soles (S/)
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light border-0">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
            className="d-flex align-items-center"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Guardar
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}