import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { registerUser } from "../../store/reducers/userActions";
import { clearErrorRegister } from "../../store/reducers/userSlice";
import "./Register.css";

const Register: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, errorRegister } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const register = (login: string, email: string, password: string) => {
    if (login !== "" && email !== "" && password !== "") {
      dispatch(
        registerUser({ login: login, email: email, password: password })
      );
    }
  };

  return (
    <section className="register" data-testid="register-page">
      <Link to="/" style={{ textDecoration: "none" }}>
        <p className="register-title">Bloggy</p>
      </Link>
      <p className="register-description">
        Регистрация нового участника сообщества
      </p>
      {isLoading === false ? (
        <span>
          <div className="register-form" data-testid="r-form">
            <input
              type="text"
              placeholder="Задайте логин"
              className="register-form__input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Укажите свой Email"
              className="register-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Придумайте надежный пароль"
              className="register-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorRegister && <p className="register-error">{errorRegister}</p>}
          <div className="register-send">
            <button
              className="register-send__start"
              onClick={() => register(login, email, password)}
              data-testid="r-button"
            >
              Начать
            </button>
            <Link
              to="/login"
              className="register-send__change"
              onClick={() => dispatch(clearErrorRegister())}
            >
              Уже зарегистрированы?{" "}
              <span className="register-send__change-styled">
                Авторизуйтесь
              </span>
            </Link>
          </div>
        </span>
      ) : (
        <p className="register-loading">Загрузка...</p>
      )}
    </section>
  );
};

export default Register;
