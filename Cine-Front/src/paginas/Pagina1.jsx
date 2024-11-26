import { useState } from "react";
import "./Pagina1.css";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [registrado, setRegistrado] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setRegistrado("");

    const response = await fetch("http://localhost:3000/autenticacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();

      setusername("");
      setPassword("");
      setError("");

      navigate("/pagina2");
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Error en el inicio de sesión");
    }
  };

  const registro = async (e) => {
    e.preventDefault();
    setError("");
    setRegistrado("");

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setRegistrado(
        "username registrado exitosamente. Ahora puedes iniciar sesión."
      );
      setIsRegistering(false);
      setusername("");
      setPassword("");
    } else {
      const errorData = await response.json();
      setError(errorData.errores?.[0]?.msg || "Error al registrar el username");
    }
  };

  return (
    <>
      <div>
        <h1>{isRegistering ? "Registro" : "Inicio de Sesión"}</h1>
        <form onSubmit={isRegistering ? registro : login}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegistering ? (
            <button type="submit">Registrar</button>
          ) : (
            <button type="submit">Iniciar Sesión</button>
          )}
        </form>

        <p>
          {isRegistering ? (
            <span>
              ¿Ya tienes una cuenta?{" "}
              <button onClick={() => setIsRegistering(false)}>
                Inicia sesión
              </button>
            </span>
          ) : (
            <span>
              ¿No tienes una cuenta?{" "}
              <button onClick={() => setIsRegistering(true)}>Regístrate</button>
            </span>
          )}
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {registrado && <p style={{ color: "green" }}>{registrado}</p>}
        {token && <p>token:{token}</p>}
      </div>
      <div>
        <Link to="/pagina2">
          <button>Siguiente</button>
        </Link>
      </div>
    </>
  );
}

export default App;
