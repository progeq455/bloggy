import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { loginUser } from "../../store/reducers/userActions";
import { clearErrorLogin } from "../../store/reducers/userSlice";
import "./Login.css";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, errorLogin } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const loginIn = (email: string, password: string) => {
    if (email !== "" && password !== "") {
      dispatch(loginUser({ email: email, password: password }));
    }
  };

  return (
    <section className="login">
      <Link to="/" style={{ textDecoration: "none" }}>
        <p className="login-title">Bloggy</p>
      </Link>
      <p className="login-description">Авторизуйтесь, чтобы продолжить</p>
      {isLoading === false ? (
        <span>
          <div className="login-form">
            <input
              type="text"
              placeholder="Email"
              className="login-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Введите пароль"
              className="login-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorLogin && <p className="login-error">{errorLogin}</p>}
          <div className="login-send">
            <button
              className="login-send__start"
              onClick={() => loginIn(email, password)}
            >
              Начать
            </button>
            <Link
              to="/register"
              className="login-send__change"
              onClick={() => dispatch(clearErrorLogin())}
            >
              Не зарегистрированы?{" "}
              <span className="login-send__change-styled">
                Создайте аккаунт
              </span>
            </Link>
          </div>
        </span>
      ) : (
        <p className="login-loading">Загрузка...</p>
      )}
    </section>
  );
};

export default Login;
