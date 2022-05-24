import React, { FC, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { generateAvatar } from "../utils/avatarGenerate";
import search from "../../icons/search.png";
import lenta from "../../icons/lenta.png";
import notification from "../../icons/notification.png";
import blog from "../../icons/blog.png";
import profile from "../../icons/profile.png";
import "./NewsFeed.css";
import { Link } from "react-router-dom";

const NewsFeed: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);

  let login: string = "";
  let email: string = "";
  let avatar: number;
  let currentAvatar: string = "";

  if ("login" in user && "email" in user && "avatar" in user) {
    login = user.login;
    email = user.email;
    avatar = user.avatar;

    currentAvatar = generateAvatar(avatar);
  }

  const changeLinkStyle = () => {
    console.log("change class")
  };

  return (
    <section className="feed">
      <div className="feed-menu">
        <header className="feed-menu__user">
          <div
            style={{
              background: `${currentAvatar}`,
            }}
            className="feed-menu__user-avatar"
          >
            {login[0].toUpperCase()}
          </div>
          <div className="feed-menu__user-info">
            <p className="feed-menu__user-login">{login}</p>
            <span className="feed-menu__user-email">{email}</span>
          </div>
        </header>
        <ul className="feed-menu__rels">
          <Link
            className="feed-menu__rels-link"
            to="/search"
            onMouseEnter={() => changeLinkStyle()}
            onMouseLeave={() => changeLinkStyle()}
          >
            <li className="feed-menu__rels-elem">
              <p className="feed-menu__rels-title">Поиск</p>
              <img
                src={search}
                alt="Поиск блогов и людей"
                className="feed-menu__rels-img"
              />
            </li>
          </Link>
          <Link className="feed-menu__rels-link" to="/newsFeed">
            <li className="feed-menu__rels-elem">
              <p className="feed-menu__rels-title">Лента</p>
              <img src={lenta} alt="Лента" className="feed-menu__rels-img" />
            </li>
          </Link>
          <Link className="feed-menu__rels-link" to="/subscribes">
            <li className="feed-menu__rels-elem">
              <p className="feed-menu__rels-title">Подписки</p>
              <img
                src={notification}
                alt="Подписки"
                className="feed-menu__rels-img"
              />
            </li>
          </Link>
          <Link className="feed-menu__rels-link" to="/myBlogs">
            <li className="feed-menu__rels-elem">
              <p className="feed-menu__rels-title">Мои блоги</p>
              <img src={blog} alt="Мои блоги" className="feed-menu__rels-img" />
            </li>
          </Link>
          <Link className="feed-menu__rels-link" to="/profile">
            <li className="feed-menu__rels-elem">
              <p className="feed-menu__rels-title">Профиль</p>
              <img
                src={profile}
                alt="Профиль"
                className="feed-menu__rels-img"
              />
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default NewsFeed;
