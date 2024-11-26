import { useState, useEffect } from "react";
import "./Pagina3.css";
//import { useNavigate } from "react-router-dom";

function App() {
    const [peliculas, setPeliculas] = useState([]);
    const [titulo, setTitulo] = useState("");

    const getPeliculas = async () => {
        const response = await fetch("http://localhost:3000/peliculas/titulos");
        if (response.ok) {
          const { peliculas } = await response.json();
          setPeliculas(peliculas);
        }
      };
    
      useEffect(() => {
        getPeliculas();
      }, []);

  return (
    <>
    <h1>Peliculas</h1>
    <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            <a>
            {`${pelicula.id}: ${pelicula.titulo}`}
            </a>
          </li>
        ))}
      </ul>
    
    </>
  );
}

export default App;
