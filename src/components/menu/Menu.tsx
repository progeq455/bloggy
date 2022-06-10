import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/redux";
import { generateAvatar } from "../utils/avatarGenerate";
import "./Menu.css";
const search = require("../../icons/search.png");
const searchGreen = require("../../icons/searchGreen.png");
const lenta = require("../../icons/lenta.png");
const lentaGreen = require("../../icons/lentaGreen.png");
const notification = require("../../icons/notification.png");
const notificationGreen = require("../../icons/notificationGreen.png");
const blog = require("../../icons/blog.png");
const blogGreen = require("../../icons/blogGreen.png");
const profile = require("../../icons/profile.png");
const profileGreen = require("../../icons/profileGreen.png");

const Menu: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);

  let login: string = "";
  let email: string = "";
  let avatar: number = 0;

  if ("avatar" in user) {
    avatar = user.avatar;
  }

  if ("login" in user && "email" in user) {
    login = user.login;
    email = user.email;
  }

  const [currentLink, setCurrentLink] = useState<number>();

  return (
    <section className="menu-container">
      <div className="menu">
        <header className="menu-user">
          <div
            style={{
              background: generateAvatar(avatar),
            }}
            className="menu-user__avatar"
          >
            {login[0].toUpperCase()}
          </div>
          <div className="menu-user__info">
            <p className="menu-user__info-login">{login}</p>
            <span className="menu-user__info-email">{email}</span>
          </div>
        </header>
        <ul className="menu-links">
          <Link
            className="menu-links__link"
            to="/search"
            onClick={() => setCurrentLink(1)}
          >
            <li
              className={`menu-links__elem ${currentLink === 1 ? "active" : ""
                }`}
            >
              <p className="menu-links__elem-title">Поиск</p>
              <img
                src={currentLink === 1 ? searchGreen : search}
                alt="Поиск блогов и людей"
                className="menu-links__elem-img"
              />
            </li>
          </Link>
          <Link
            className="menu-links__link"
            to="/newsFeed"
            onClick={() => setCurrentLink(2)}
          >
            <li
              className={`menu-links__elem ${currentLink === 2 ? "active" : ""
                }`}
            >
              <p className="menu-links__elem-title">Лента</p>
              <img
                src={currentLink === 2 ? lentaGreen : lenta}
                alt="Лента"
                className="menu-links__elem-img"
              />
            </li>
          </Link>
          <Link
            className="menu-links__link"
            to="/subscribes"
            onClick={() => setCurrentLink(3)}
          >
            <li
              className={`menu-links__elem ${currentLink === 3 ? "active" : ""
                }`}
            >
              <p className="menu-links__elem-title">Подписки</p>
              <img
                src={currentLink === 3 ? notificationGreen : notification}
                alt="Подписки"
                className="menu-links__elem-img"
              />
            </li>
          </Link>
          <Link
            className="menu-links__link"
            to="/myBlogs"
            onClick={() => setCurrentLink(4)}
          >
            <li
              className={`menu-links__elem ${currentLink === 4 ? "active" : ""
                }`}
            >
              <p className="menu-links__elem-title">Мои блоги</p>
              <img
                src={currentLink === 4 ? blogGreen : blog}
                alt="Мои блоги"
                className="menu-links__elem-img"
              />
            </li>
          </Link>
          <Link
            className="menu-links__link"
            to="/profile"
            onClick={() => setCurrentLink(5)}
          >
            <li
              className={`menu-links__elem ${currentLink === 5 ? "active" : ""
                }`}
            >
              <p className="menu-links__elem-title">Профиль</p>
              <img
                src={currentLink === 5 ? profileGreen : profile}
                alt="Профиль"
                className="menu-links__elem-img"
              />
            </li>
          </Link>
        </ul>
      </div>
      <section className="menu-mobile">
        <Link
          to="/newsFeed"
          className="menu-mobile__link"
          onClick={() => setCurrentLink(1)}
        >
          <img
            src={currentLink === 1 ? lentaGreen : lenta}
            alt="Лента"
            className="menu-mobile__link-img"
          />
        </Link>
        <Link
          to="/search"
          className="menu-mobile__link"
          onClick={() => setCurrentLink(2)}
        >
          <img
            src={currentLink === 2 ? searchGreen : search}
            alt="Поиск"
            className="menu-mobile__link-img"
          />
        </Link>
        <Link
          to="/subscribes"
          className="menu-mobile__link"
          onClick={() => setCurrentLink(3)}
        >
          <img
            src={currentLink === 3 ? notificationGreen : notification}
            alt="Подписки"
            className="menu-mobile__link-img"
          />
        </Link>
        <Link
          to="/myBlogs"
          className="menu-mobile__link"
          onClick={() => setCurrentLink(4)}
        >
          <img
            src={currentLink === 4 ? blogGreen : blog}
            alt="Мои блоги"
            className="menu-mobile__link-img"
          />
        </Link>
        <Link
          to="/profile"
          className="menu-mobile__link"
          onClick={() => setCurrentLink(5)}
        >
          <img
            src={currentLink === 5 ? profileGreen : profile}
            alt="Профиль"
            className="menu-mobile__link-img"
          />
        </Link>
      </section>
      <div className="menu-mobile__padding"></div>
    </section>
  );
};

export default Menu;
