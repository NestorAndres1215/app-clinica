import { useState, useEffect } from "react";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../../services/pacienteService";
import { getDistritos } from "../../services/distritoService";
import DataTable from "../../components/Table";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState({
    codpac: "",
    nompac: "",
    dnipac: "",
    tel_cel: "",
    dirpac: "",
    coddis: "",
    estado: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [resPac, resDis] = await Promise.all([
        getPacientes(),
        getDistritos(),
      ]);
      setPacientes(resPac.data || []);
      setDistritos(resDis.data || []);
    } catch (err) {
      setError("Error al cargar datos. Intente más tarde.");
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
      codpac: "",
      nompac: "",
      dnipac: "",
      tel_cel: "",
      dirpac: "",
      coddis: "",
      estado: 1,
    });
    setError("");
  };

  const handleSave = async () => {
    if (!current.nompac || !current.dnipac || !current.coddis) {
      setError("Complete los campos obligatorios (*)");
      return;
    }

    setLoading(true);
    try {
      if (current.codpac) {
        await updatePaciente(current.codpac, current);
      } else {
        await createPaciente(current);
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
    if (!window.confirm(`¿Eliminar a ${row.nompac}?`)) return;

    setLoading(true);
    try {
      await deletePaciente(row.codpac);
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
    { key: "codpac", label: "Código", icon: "fas fa-hashtag" },
    { key: "nompac", label: "Nombre", icon: "fas fa-user" },
    { key: "dnipac", label: "DNI", icon: "fas fa-id-card" },
    { key: "tel_cel", label: "Celular", icon: "fas fa-phone" },
    { key: "dirpac", label: "Dirección", icon: "fas fa-home" },
    {
      key: "coddis",
      label: "Distrito",
      icon: "fas fa-map-marker-alt",
      render: (row) => {
        const dis = distritos.find((d) => d.coddis === row.coddis);
        return dis ? dis.nomdis : "—";
      },
      filterable: true,
    },
    {
      key: "estado",
      label: "Estado",
      icon: "fas fa-circle",
      render: (row) => (
        <span
          className={`badge ${
            row.estado === 1 ? "bg-success" : "bg-secondary"
          }`}
        >
          {row.estado === 1 ? "Activo" : "Inactivo"}
        </span>
      ),
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
              <i className="fas fa-user-injured me-3"></i>
              Gestión de Pacientes
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
              Nuevo Paciente
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
              <p className="mt-3 text-muted">Cargando pacientes...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={pacientes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              title=""
              itemsPerPage={5}
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
            <i className="fas fa-user-edit me-2"></i>
            {current.codpac ? "Editar" : "Nuevo"} Paciente
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
                    value={current.codpac}
                    onChange={(e) =>
                      setCurrent({ ...current, codpac: e.target.value })
                    }
                    disabled={!!current.codpac}
                    placeholder="Automático"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-user text-primary me-1"></i>
                    Nombre *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.nompac}
                    onChange={(e) =>
                      setCurrent({ ...current, nompac: e.target.value })
                    }
                    placeholder="Juan Pérez"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-id-card text-primary me-1"></i>
                    DNI *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.dnipac}
                    onChange={(e) =>
                      setCurrent({ ...current, dnipac: e.target.value })
                    }
                    placeholder="12345678"
                    maxLength={8}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-phone text-primary me-1"></i>
                    Celular
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.tel_cel}
                    onChange={(e) =>
                      setCurrent({ ...current, tel_cel: e.target.value })
                    }
                    placeholder="987654321"
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-home text-primary me-1"></i>
                    Dirección
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.dirpac}
                    onChange={(e) =>
                      setCurrent({ ...current, dirpac: e.target.value })
                    }
                    placeholder="Av. Principal 123"
                  />
                </Form.Group>
              </div>
              <div className="col-md-8">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-map-marker-alt text-primary me-1"></i>
                    Distrito *
                  </Form.Label>
                  <Form.Select
                    value={current.coddis}
                    onChange={(e) =>
                      setCurrent({ ...current, coddis: e.target.value })
                    }
                  >
                    <option value="">Seleccione distrito</option>
                    {distritos.map((dis) => (
                      <option key={dis.coddis} value={dis.coddis}>
                        {dis.nomdis}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-circle text-primary me-1"></i>
                    Estado
                  </Form.Label>
                  <Form.Select
                    value={current.estado}
                    onChange={(e) =>
                      setCurrent({ ...current, estado: parseInt(e.target.value) })
                    }
                  >
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                  </Form.Select>
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