import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [año, setAño] = useState("");
  const [duracion, setDuracion] = useState("");
  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [peliculaId, setPeliculaId] = useState(0);

  const getPeliculas = async () => {
    const response = await fetch("http://localhost:3000/peliculas");
    if (response.ok) {
      const { peliculas } = await response.json();
      setPeliculas(peliculas);
    }
  };

  useEffect(() => {
    getPeliculas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/peliculas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        descripcion,
        año,
        duracion,
        genero,
        director,
      }),
    });

    if (response.ok) {
      const { peliculas: nuevaPelicula } = await response.json();
      setPeliculas([...peliculas, nuevaPelicula]);
      setTitulo("");
      setDescripcion("");
      setAño("");
      setDuracion("");
      setGenero("");
      setDirector("");
    }
  };
  const modificarPelicula = (pelicula) => {
    setPeliculaId(pelicula.id);
    setTitulo(pelicula.titulo);
    setDescripcion(pelicula.descripcion);
    setAño(pelicula.año);
    setDuracion(pelicula.duracion);
    setGenero(pelicula.genero);
    setDirector(pelicula.director);
  };
  const modificarPeliculaApi = async () => {
    const response = await fetch(
      `http://localhost:3000/peliculas/${peliculaId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          año,
          duracion,
          genero,
          director,
        }),
      }
    );

    if (response.ok) {
      const { peliculas: peliculaActualizada } = await response.json();
      setPeliculas(
        peliculas.map((p) =>
          p.id === peliculaActualizada.id ? peliculaActualizada : p
        )
      );
      setTitulo("");
      setDescripcion("");
      setAño("");
      setDuracion("");
      setGenero("");
      setDirector("");
      setPeliculaId(0);
    }
  };
  const quitarPelicula = async (id) => {
    if (confirm("¿Desea quitar esta película?")) {
      const response = await fetch(`http://localhost:3000/peliculas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPeliculas(peliculas.filter((p) => p.id !== id));
      }
    }
  };

  return (
    <>
      <h1>Películas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="año">Año</label>
          <input
            type="number"
            id="año"
            value={año}
            onChange={(e) => setAño(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="duracion">Duración (min)</label>
          <input
            type="number"
            id="duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="genero">Género</label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        {peliculaId === 0 && <button type="submit">Agregar</button>}
        {peliculaId !== 0 && (
          <>
            <button onClick={modificarPeliculaApi}>Modificar</button>
            <button
              onClick={() => {
                setPeliculaId(0);
                setTitulo("");
                setDescripcion("");
                setAño("");
                setDuracion("");
                setGenero("");
                setDirector("");
              }}
            >
              Cancelar
            </button>
          </>
        )}
      </form>
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            {`${pelicula.id}: ${pelicula.titulo} (${pelicula.año}) - ${pelicula.director}`}
            <button
              onClick={() => modificarPelicula(pelicula)}
              disabled={peliculaId !== 0}
            >
              Editar
            </button>
            <button
              onClick={() => quitarPelicula(pelicula.id)}
              disabled={peliculaId !== 0}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
