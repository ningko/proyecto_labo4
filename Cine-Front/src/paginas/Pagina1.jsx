import { useState } from "react";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registrado, setRegistrado] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setRegistrado("");

    const response = await fetch("http://localhost:3000/autenticacion/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      setToken(token);
      setUsuario("");
      setPassword("");
      setError("");
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Error en el inicio de sesión");
    }
  };

  const registro = async (e) => {
    e.preventDefault();
    setError("");
    setRegistrado("");

    const response = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }),
    });

    if (response.ok) {
      setRegistrado(
        "Usuario registrado exitosamente. Ahora puedes iniciar sesión."
      );
      setIsRegistering(false);
      setUsuario("");
      setPassword("");
    } else {
      const errorData = await response.json();
      setError(errorData.errores?.[0]?.msg || "Error al registrar el usuario");
    }
  };

  return (
    <div>
      <h1>{isRegistering ? "Registro" : "Inicio de Sesión"}</h1>
      <form onSubmit={isRegistering ? registro : login}>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
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
    </div>
  );
}

export default App;
