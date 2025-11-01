import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Especialidades from "../pages/Especialidades/Especialidades";
import Distritos from "../pages/Distritos/Distritos";
import Medicos from "../pages/Medicos/Medicos";
import Pacientes from "../pages/Pacientes/Pacientes";
import Citas from "../pages/Citas/Citas";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="especialidades" element={<Especialidades />} />
          <Route path="distritos" element={<Distritos />} />
          <Route path="medicos" element={<Medicos />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="citas" element={<Citas />} />
        </Route>
      </Routes>
    </Router>
  );
}
