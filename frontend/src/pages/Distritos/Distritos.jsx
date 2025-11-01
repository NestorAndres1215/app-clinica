import { useState, useEffect } from "react";
import {
  getDistritos,
  createDistrito,
  updateDistrito,
  deleteDistrito,
} from "../../services/distritoService";
import DataTable from "../../components/Table";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

export default function Distritos() {
  const [distritos, setDistritos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState({
    coddis: "",
    nomdis: "",
  });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getDistritos();
      setDistritos(res.data || []);
    } catch (err) {
      setError("Error al cargar distritos. Intente más tarde.");
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
      coddis: "",
      nomdis: "",
    });
    setError("");
  };

  const handleSave = async () => {
    if (!current.nomdis.trim()) {
      setError("El nombre del distrito es obligatorio (*)");
      return;
    }

    if (!current.coddis.trim()) {
      setError("El código es obligatorio (*)");
      return;
    }

    setLoading(true);
    try {
      if (current.coddis) {
        await updateDistrito(current.coddis, current);
      } else {
        await createDistrito(current);
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
    if (!window.confirm(`¿Eliminar el distrito "${row.nomdis}"?`)) return;

    setLoading(true);
    try {
      await deleteDistrito(row.coddis);
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
    { key: "coddis", label: "Código", icon: "fas fa-hashtag" },
    { key: "nomdis", label: "Nombre del Distrito", icon: "fas fa-map-marker-alt", filterable: true },
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
              <i className="fas fa-map-marker-alt me-3"></i>
              Gestión de Distritos
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
              Nuevo Distrito
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
              <p className="mt-3 text-muted">Cargando distritos...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={distritos}
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
            <i className="fas fa-map-marker-alt me-2"></i>
            {current.coddis ? "Editar" : "Nuevo"} Distrito
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
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-hashtag text-primary me-1"></i>
                    Código *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.coddis}
                    onChange={(e) =>
                      setCurrent({ ...current, coddis: e.target.value.toUpperCase() })
                    }
                    placeholder="LIMA01"
                    maxLength={6}
                  />
                  <Form.Text className="text-muted">
                    Ej: LIMA01, AREQ01
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-map-marker-alt text-primary me-1"></i>
                    Nombre *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.nomdis}
                    onChange={(e) =>
                      setCurrent({ ...current, nomdis: e.target.value })
                    }
                    placeholder="Miraflores"
                  />
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