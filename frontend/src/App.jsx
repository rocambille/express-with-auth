import { useEffect, useState } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user != null) {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"
        }/show-token`,
        {
          credentials: "include",
        }
      );
    }
  }, [user]);

  const logout = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"}/logout`,
      {
        credentials: "include",
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
      }
    });
  };

  return (
    <div className="App">
      {user == null ? (
        <>
          <details>
            <summary>Register</summary>
            <RegisterForm />
          </details>
          <details>
            <summary>Login</summary>
            <LoginForm setUser={setUser} />
          </details>
        </>
      ) : (
        <button type="button" onClick={logout}>
          Logout
        </button>
      )}
      <Home />
      <p>coucou</p>
    </div>
  );
}

export default App;
