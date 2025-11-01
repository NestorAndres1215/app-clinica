import { useState, useMemo } from "react";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Badge,
  Form,
  InputGroup,
  Pagination,
  Dropdown,
} from "react-bootstrap";

export default function DataTable({
  columns,
  data = [],
  onEdit,
  onDelete,
  loading = false,
  emptyMessage = "No se encontraron registros",
  title = "Lista de Registros",
  itemsPerPage = 5,
}) {
  // Estados
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Filtros y búsqueda
  const filteredData = useMemo(() => {
    let filtered = data;

    // Búsqueda global
    if (search) {
      filtered = filtered.filter((row) =>
        Object.values(row).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Filtro por columna
    if (filterColumn && filterValue) {
      filtered = filtered.filter(
        (row) => row[filterColumn]?.toString() === filterValue
      );
    }

    return filtered;
  }, [data, search, filterColumn, filterValue]);

  // Paginación
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const resetPage = () => setCurrentPage(1);

  return (
    <div
      className="card border-0 shadow-lg rounded-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div className="card-header py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <h5 className="mb-0 fw-bold d-flex align-items-center text-white">
          <i className="fas fa-table me-2"></i>
          {title}
        </h5>

        <div className="d-flex flex-column flex-md-row gap-2">
          {/* Búsqueda */}
          <InputGroup size="sm" style={{ width: "220px" }}>
            <InputGroup.Text className="bg-white bg-opacity-25 text-white border-0">
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="bg-white bg-opacity-25 text-white border-0 placeholder-white placeholder-opacity-75"
              style={{ "::placeholder": { color: "rgba(255,255,255,0.7)" } }}
            />
          </InputGroup>

          {/* Filtro por columna */}
          <Dropdown size="sm" onSelect={(e) => { setFilterColumn(e); setFilterValue(""); resetPage(); }}>
            <Dropdown.Toggle
              variant="light"
              className="bg-white bg-opacity-25 text-white border-0 d-flex align-items-center"
            >
              <i className="fas fa-filter me-1"></i>
              Filtro
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {columns
                .filter((col) => col.filterable !== false)
                .map((col) => (
                  <Dropdown.Item key={col.key} eventKey={col.key}>
                    {col.icon && <i className={`${col.icon} me-2`}></i>}
                    {col.label}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>

          {filterColumn && (
            <Form.Select
              size="sm"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                resetPage();
              }}
              className="bg-white bg-opacity-25 text-white border-0"
              style={{ width: "140px" }}
            >
              <option value="">Todos</option>
              {Array.from(new Set(data.map((row) => row[filterColumn])))
                .filter(Boolean)
                .sort()
                .map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
            </Form.Select>
          )}
        </div>
      </div>

      {/* Cuerpo */}
      <div className="card-body p-0">
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="bg-white bg-opacity-90 text-dark small text-uppercase">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 fw-semibold">
                    {col.icon && <i className={`${col.icon} me-2 text-primary`}></i>}
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-center fw-semibold">
                  <i className="fas fa-cogs text-primary me-2"></i>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white bg-opacity-95">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-5">
                    <Spinner animation="border" variant="primary" size="sm" className="me-2" />
                    <span className="text-primary">Cargando...</span>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-5">
                    <div className="text-primary">
                      <i className="fas fa-heartbeat fa-3x mb-3 opacity-75"></i>
                      <p className="mb-0 fw-medium">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr key={row.id || index}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                        <Button
                          variant="outline-light"
                          size="sm"
                          className="me-2 border-primary text-primary"
                          style={{ background: "rgba(102, 126, 234, 0.2)" }}
                          onClick={() => onEdit(row)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                        <Button
                          variant="outline-light"
                          size="sm"
                          className="border-danger text-danger"
                          style={{ background: "rgba(220, 53, 69, 0.2)" }}
                          onClick={() => onDelete(row)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="card-footer bg-white bg-opacity-10 py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <small className="text-white opacity-75">
              Mostrando <strong>{paginatedData.length}</strong> de <strong>{filteredData.length}</strong>
            </small>
            <Pagination size="sm" className="mb-0">
              <Pagination.Prev
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      )}

      {/* Footer */}
      {filteredData.length > 0 && !loading && (
        <div className="text-center py-2 text-white small opacity-75">
          <i className="fas fa-shield-alt text-success me-1"></i>
          Datos seguros · {new Date().toLocaleString()}
        </div>
      )}
    </div>
  );
}