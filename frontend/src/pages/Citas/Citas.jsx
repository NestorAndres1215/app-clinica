import { useState, useEffect } from "react";
import {
  getCitas,
  createCita,
  updateCita,
  deleteCita,
} from "../../services/citaService";
import { getMedicos } from "../../services/medicoService";
import { getPacientes } from "../../services/pacienteService";
import DataTable from "../../components/Table";
import { Button, Modal, Form, Spinner, Alert, Badge } from "react-bootstrap";

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState({
    nrocita: "",
    codmed: "",
    codpac: "",
    tipo: 1,
    pago: 0,
    fecha: "",
    estado: 0,
    descrip: "",
  });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [resCitas, resMed, resPac] = await Promise.all([
        getCitas(),
        getMedicos(),
        getPacientes(),
      ]);
      setCitas(resCitas.data || []);
      setMedicos(resMed.data || []);
      setPacientes(resPac.data || []);
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
      nrocita: "",
      codmed: "",
      codpac: "",
      tipo: 1,
      pago: 0,
      fecha: "",
      estado: 0,
      descrip: "",
    });
    setError("");
  };

  const handleSave = async () => {
    if (!current.codmed || !current.codpac || !current.fecha) {
      setError("Médico, paciente y fecha son obligatorios (*)");
      return;
    }

    const fecha = new Date(current.fecha);
    if (isNaN(fecha.getTime())) {
      setError("Fecha inválida");
      return;
    }

    if (current.pago < 0) {
      setError("El pago no puede ser negativo");
      return;
    }

    setLoading(true);
    try {
      if (current.nrocita) {
        await updateCita(current.nrocita, current);
      } else {
        await createCita(current);
      }
      await fetchData();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError("Error al guardar la cita. Verifique los datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`¿Eliminar la cita #${row.nrocita}?`)) return;

    setLoading(true);
    try {
      await deleteCita(row.nrocita);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-PE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const getEstadoBadge = (estado) => {
    const map = {
      0: { text: "Pendiente", variant: "warning" },
      1: { text: "Atendido", variant: "success" },
      2: { text: "Cancelado", variant: "danger" },
    };
    const { text, variant } = map[estado] || { text: "Desconocido", variant: "secondary" };
    return <Badge bg={variant}>{text}</Badge>;
  };

  const columns = [
    { key: "nrocita", label: "N° Cita", icon: "fas fa-hashtag" },
    {
      key: "codmed",
      label: "Médico",
      icon: "fas fa-user-md",
      render: (row) => {
        const med = medicos.find((m) => m.codmed === row.codmed);
        return med ? med.nommed : "—";
      },
      filterable: true,
    },
    {
      key: "codpac",
      label: "Paciente",
      icon: "fas fa-user",
      render: (row) => {
        const pac = pacientes.find((p) => p.codpac === row.codpac);
        return pac ? pac.nompac : "—";
      },
      filterable: true,
    },
    {
      key: "tipo",
      label: "Tipo",
      icon: "fas fa-clipboard-check",
      render: (row) => (row.tipo === 1 ? "Consulta" : "Otro"),
    },
    {
      key: "pago",
      label: "Pago",
      icon: "fas fa-dollar-sign",
      render: (row) => `S/ ${parseFloat(row.pago).toFixed(2)}`,
    },
    {
      key: "fecha",
      label: "Fecha y Hora",
      icon: "fas fa-calendar-alt",
      render: (row) => formatDate(row.fecha),
      filterable: true,
    },
    {
      key: "estado",
      label: "Estado",
      icon: "fas fa-circle",
      render: (row) => getEstadoBadge(row.estado),
      filterable: true,
    },
    {
      key: "descrip",
      label: "Descripción",
      icon: "fas fa-comment-medical",
      render: (row) => row.descrip || "—",
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
              <i className="fas fa-calendar-check me-3"></i>
              Gestión de Citas
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
              Nueva Cita
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
              <p className="mt-3 text-muted">Cargando citas...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={citas}
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
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered backdrop="static">
        <Modal.Header
          closeButton
          className="bg-primary text-white border-0"
        >
          <Modal.Title className="d-flex align-items-center">
            <i className="fas fa-calendar-plus me-2"></i>
            {current.nrocita ? "Editar" : "Nueva"} Cita
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
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-hashtag text-primary me-1"></i>
                    N° Cita
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.nrocita}
                    onChange={(e) =>
                      setCurrent({ ...current, nrocita: e.target.value })
                    }
                    disabled={!!current.nrocita}
                    placeholder="Automático"
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-user-md text-primary me-1"></i>
                    Médico *
                  </Form.Label>
                  <Form.Select
                    value={current.codmed}
                    onChange={(e) =>
                      setCurrent({ ...current, codmed: e.target.value })
                    }
                  >
                    <option value="">Seleccione médico</option>
                    {medicos.map((m) => (
                      <option key={m.codmed} value={m.codmed}>
                        {m.nommed}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-user text-primary me-1"></i>
                    Paciente *
                  </Form.Label>
                  <Form.Select
                    value={current.codpac}
                    onChange={(e) =>
                      setCurrent({ ...current, codpac: e.target.value })
                    }
                  >
                    <option value="">Seleccione paciente</option>
                    {pacientes.map((p) => (
                      <option key={p.codpac} value={p.codpac}>
                        {p.nompac}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-calendar-alt text-primary me-1"></i>
                    Fecha y Hora *
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={current.fecha}
                    onChange={(e) =>
                      setCurrent({ ...current, fecha: e.target.value })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-dollar-sign text-primary me-1"></i>
                    Pago
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={current.pago}
                    onChange={(e) =>
                      setCurrent({ ...current, pago: e.target.value })
                    }
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
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
                    <option value={0}>Pendiente</option>
                    <option value={1}>Atendido</option>
                    <option value={2}>Cancelado</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-comment-medical text-primary me-1"></i>
                    Descripción
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={current.descrip}
                    onChange={(e) =>
                      setCurrent({ ...current, descrip: e.target.value })
                    }
                    placeholder="Motivo de la consulta..."
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