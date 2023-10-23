import useRouter from "next/router";
import React from "react";
import { authService } from "../src/services/auth/authService";
export default function HomeScreen() {
  const [value, setValue] = React.useState({
    usuario: "",
    senha: "",
  });

  const handleChange = ({ target }) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    authService
      .login({
        username: value.usuario,
        password: value.senha,
      })
      .then(() => {
        useRouter.push("/auth-page-ssr");
      })
      .catch((err) => {
        alert("Erro ao fazer login");
      });

    // useRouter.push("/auth-page-static");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          name="usuario"
          value={value.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={value.senha}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
