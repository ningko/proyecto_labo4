import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagina1 from "./paginas/Pagina1";
import Pagina2 from "./paginas/Pagina2";
import Pagina3 from "./paginas/Pagina3";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pagina1 />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/pagina3" element={<Pagina3 />} />
      </Routes>
    </Router>
  );
}

export default App;
