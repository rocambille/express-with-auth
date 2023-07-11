import { useRef } from "react";
import PropTypes from "prop-types";

function LoginForm({ setUser }) {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"}/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.info("do you see cookie here ?", document.cookie);

        setUser(data.user);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id="username" ref={usernameRef} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit">Go</button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
