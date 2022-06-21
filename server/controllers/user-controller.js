const db = require("../db");

class UserController {
  async updateUser(req, res) {
    try {
      let { avatar, about } = req.body;

      if (typeof avatar === "string") {
        avatar = 0;
      }

      if (avatar > 4) {
        return res.status(400).json({ message: "Некорректный аватар" });
      }

      if (avatar < 0) {
        return res.status(400).json({ message: "Некорректный аватар" });
      }

      const user = await db.query(
        "UPDATE users SET user_avatar = $1, user_about = $2 WHERE user_id = $3 RETURNING *",
        [Number(avatar), about, req.user.id]
      );

      res.json(user.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "Ошибка изменения профиля" });
    }
  }

  async getAboutMe(req, res) {
    try {
      const { type } = req.body;

      const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
        req.user.id,
      ]);

      if (user.rowCount === 0) {
        return res.status(400).json({ message: "Не найден пользователь" });
      }

      let userData;

      if (type === "short") {
        userData = {
          user_login: user.rows[0].user_login,
          user_avatar: user.rows[0].user_avatar,
          user_email: user.rows[0].user_email,
        };
      } else if (type === "full") {
        userData = {
          user_login: user.rows[0].user_login,
          user_email: user.rows[0].user_email,
          user_avatar: user.rows[0].user_avatar,
          user_about: user.rows[0].user_about,
        };
      } else {
        return res.status(400).json({ message: "Не указан тип для получения" });
      }

      res.json(userData);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении информации" });
    }
  }

  async getMySubscribes(req, res) {
    try {
      const { type } = req.query;

      if (type === "basic") {
        const getSubs = await db.query(
          "SELECT blogs.blog_avatar, blogs.blog_id, blogs.blog_caption, subscribesBlogs.subscribed_blog_id, subscribesBlogs.subscribed_by_user FROM blogs, subscribesBlogs WHERE blogs.blog_id = subscribesBlogs.subscribed_blog_id AND subscribesBlogs.subscribed_by_user = $1",
          [req.user.id]
        );

        if (getSubs.rowCount === 0) {
          return res.status(400).json({ message: "Подписок нету" });
        } else {
          const getArticlesOfSubsBlogsAll = await db.query(
            "SELECT blogs.blog_id, blogs.blog_avatar, articles.article_id, articles.article_caption, blogs.blog_caption, articles.article_content, articles.article_dateCreated FROM articles, blogs, subscribesBlogs WHERE articles.article_blog_id = blogs.blog_id AND blogs.blog_id = subscribesBlogs.subscribed_blog_id AND subscribesBlogs.subscribed_by_user = $1 ORDER BY articles.article_dateCreated DESC",
            [req.user.id]
          );
          res.json(getArticlesOfSubsBlogsAll.rows);
        }
      } else if (type === "short") {
        const getSubs = await db.query(
          "SELECT blogs.blog_avatar, blogs.blog_id, blogs.blog_caption, subscribesBlogs.subscribed_blog_id, subscribesBlogs.subscribed_by_user FROM blogs, subscribesBlogs WHERE blogs.blog_id = subscribesBlogs.subscribed_blog_id AND subscribesBlogs.subscribed_by_user = $1",
          [req.user.id]
        );

        if (getSubs.rowCount === 0) {
          return res.status(400).json({ message: "Подписок нету" });
        } else {
          res.json(getSubs.rows);
        }
      } else {
        return res.status(400).json({ message: "Не указан тип для получения" });
      }
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении информации" });
    }
  }

  async getUserAndHisBlogs(req, res) {
    try {
      const { idUser } = req.body;

      const aboutUser = await db.query(
        "SELECT user_id, user_avatar, user_login, user_about FROM users WHERE user_id = $1",
        [idUser]
      );

      if (aboutUser.rowCount === 0) {
        return res.status(400).json({ message: "Такого пользователя нету" });
      }

      const blogsUser = await db.query(
        "SELECT blogs.blog_id, blogs.blog_avatar, blogs.blog_caption FROM blogs WHERE blogs.blog_user_id = $1",
        [idUser]
      );

      const dataAboutUser = {
        info: aboutUser.rows[0],
        blogs: blogsUser.rows,
      };

      res.json(dataAboutUser);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении информации" });
    }
  }
}

module.exports = new UserController();
