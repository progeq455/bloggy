import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Lending.css";

const Lending: FC = () => {
  return (
    <section className="lending">
      <p className="lending-title">Bloggy</p>
      <div className="lending-description">
        Bloggy – это интернет-
        <span className="lending-description__text-colorized">платформа </span>
        для чтения и ведения собственных
        <span className="lending-description__text-colorized"> блогов </span>
        на темы IT-сообщества, веб-технологиях, разработки.
        <span className="lending-description__text-colorized">Читайте </span>
        статьи и блоги других людей,
        <span className="lending-description__text-colorized">
          {" "}
          создавайте{" "}
        </span>
        и делитесь!
      </div>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button className="lending-login">Войти в аккаунт</button>
      </Link>
    </section>
  );
};

export default Lending;
