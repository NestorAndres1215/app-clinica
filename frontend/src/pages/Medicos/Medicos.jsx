import { useState, useEffect } from "react";
import {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} from "../../services/medicoService";
import { getEspecialidades } from "../../services/especialidadService";
import { getDistritos } from "../../services/distritoService";
import DataTable from "../../components/Table";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState({
    codmed: "",
    nommed: "",
    anio_colegio: "",
    codesp: "",
    coddis: "",
    estado: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [resMed, resEsp, resDis] = await Promise.all([
        getMedicos(),
        getEspecialidades(),
        getDistritos(),
      ]);
      setMedicos(resMed.data || []);
      setEspecialidades(resEsp.data || []);
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
      codmed: "",
      nommed: "",
      anio_colegio: "",
      codesp: "",
      coddis: "",
      estado: 1,
    });
    setError("");
  };

  const handleSave = async () => {
    if (!current.nommed || !current.codesp || !current.coddis) {
      setError("Complete los campos obligatorios (*)");
      return;
    }

    setLoading(true);
    try {
      if (current.codmed) {
        await updateMedico(current.codmed, current);
      } else {
        await createMedico(current);
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
    if (!window.confirm(`¿Eliminar al Dr. ${row.nommed}?`)) return;

    setLoading(true);
    try {
      await deleteMedico(row.codmed);
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
    { key: "codmed", label: "Código", icon: "fas fa-hashtag" },
    { key: "nommed", label: "Nombre", icon: "fas fa-user-md" },
    {
      key: "anio_colegio",
      label: "Año Colegio",
      icon: "fas fa-graduation-cap",
      render: (row) => row.anio_colegio || "—",
    },
    {
      key: "codesp",
      label: "Especialidad",
      icon: "fas fa-stethoscope",
      render: (row) => {
        const esp = especialidades.find((e) => e.codesp === row.codesp);
        return esp ? esp.nomesp : "—";
      },
      filterable: true,
    },
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
              <i className="fas fa-user-md me-3"></i>
              Gestión de Médicos
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
              Nuevo Médico
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
              <p className="mt-3 text-muted">Cargando médicos...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={medicos}
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
            <i className="fas fa-user-md me-2"></i>
            {current.codmed ? "Editar" : "Nuevo"} Médico
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
                    value={current.codmed}
                    onChange={(e) =>
                      setCurrent({ ...current, codmed: e.target.value })
                    }
                    disabled={!!current.codmed}
                    placeholder="Automático"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-user-md text-primary me-1"></i>
                    Nombre *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={current.nommed}
                    onChange={(e) =>
                      setCurrent({ ...current, nommed: e.target.value })
                    }
                    placeholder="Dr. Luis Ramírez"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-graduation-cap text-primary me-1"></i>
                    Año Colegio
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={current.anio_colegio}
                    onChange={(e) =>
                      setCurrent({ ...current, anio_colegio: e.target.value })
                    }
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label className="fw-semibold text-danger">
                    <i className="fas fa-stethoscope text-primary me-1"></i>
                    Especialidad *
                  </Form.Label>
                  <Form.Select
                    value={current.codesp}
                    onChange={(e) =>
                      setCurrent({ ...current, codesp: e.target.value })
                    }
                  >
                    <option value="">Seleccione especialidad</option>
                    {especialidades.map((esp) => (
                      <option key={esp.codesp} value={esp.codesp}>
                        {esp.nomesp}
                      </option>
                    ))}
                  </Form.Select>
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