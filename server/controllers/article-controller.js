const db = require("../db");
const config = require("config");
const Uuid = require("uuid");
const fs = require("fs");
const articleUpdateBannerTranfer = require("../utils/articleBannerUpdateTranfer");

class ArticleController {
  async createArticle(req, res) {
    try {
      const { blogId, caption, content } = req.body;

      const getBlog = await db.query(
        "SELECT * FROM blogs WHERE blog_user_id = $1 AND blog_id = $2",
        [req.user.id, blogId]
      );

      if (getBlog.rowCount === 0) {
        return res.status(400).json({ message: "Такого блога нету" });
      }

      if (!caption) {
        return res.status(400).json({ message: "Некорректное название" });
      }

      if (caption.length < 1) {
        return res.status(400).json({ message: "Некорректное название" });
      }

      if (!content) {
        return res.status(400).json({ message: "Некорректный контент" });
      }

      if (content.length < 100) {
        return res.status(400).json({ message: "Слишком маленькая статья" });
      }

      let bannerFile;
      let bannerName;

      if (!req.files) {
        bannerName = "";
      } else {
        bannerFile = req.files.banner;
        if (bannerFile) {
          bannerName = Uuid.v4() + ".jpg";
          bannerFile.mv(
            config.get("staticArticlesBanners") + "\\" + bannerName
          );
        } else {
          bannerName = "";
        }
      }

      const dateCreated = new Date().toLocaleDateString();

      const newArticle = await db.query(
        "INSERT INTO articles (article_blog_id, article_user_id, article_banner, article_caption, article_content, article_dateCreated) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [blogId, req.user.id, bannerName, caption, content, dateCreated]
      );
      res.json(newArticle.rows[0]);
    } catch (e) {
      res.status(400).json({ message: "Ошибка создания статьи" });
    }
  }

  async updateArticle(req, res) {
    try {
      let { caption, content, id } = req.body;

      const getArticle = await db.query(
        "SELECT * FROM articles WHERE article_id = $1 AND article_user_id = $2",
        [id, req.user.id]
      );

      if (getArticle.rowCount === 0) {
        return res.status(400).json({ message: "Такой статьи нету" });
      }

      if (!caption) {
        caption = getArticle.rows[0].article_caption;
      }

      if (!content) {
        content = getArticle.rows[0].article_content;
      } else if (!content && getArticle.rows[0].article_content === "") {
        content = "";
      }

      let bannerName = "";

      if (!req.files) {
        bannerName = getArticle.rows[0].article_banner;
      } else {
        const filesNames = articleUpdateBannerTranfer(
          req.files.banner,
          getArticle.rows[0].article_banner
        );
        bannerName = filesNames;
      }

      if (
        bannerName === undefined &&
        getArticle.rows[0].article_banner !== ""
      ) {
        bannerName = getArticle.rows[0].article_banner;
      } else if (bannerName === undefined) {
        bannerName = "";
      }

      const newArticle = await db.query(
        "UPDATE articles SET article_caption = $1, article_content = $2, article_banner = $3 WHERE article_id = $4 AND article_user_id = $5 RETURNING *",
        [caption, content, bannerName, id, req.user.id]
      );

      res.json(newArticle.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "Ошибка изменения статьи" });
    }
  }

  async deleteArticle(req, res) {
    try {
      const { id } = req.body;

      const article = await db.query(
        "SELECT * FROM articles WHERE article_id = $1 AND article_user_id = $2",
        [id, req.user.id]
      );

      if (article.rowCount === 0) {
        return res.status(400).json({ message: "Такой статьи нету" });
      }

      if (article.rows[0].article_banner) {
        fs.unlinkSync(
          config.get("staticArticlesBanners") +
            "/" +
            article.rows[0].article_banner
        );
      }

      await db.query(
        "DELETE FROM articles WHERE article_id = $1 AND article_user_id = $2",
        [id, req.user.id]
      );

      res.json({ message: "Статья удалена" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка при удалении статьи" });
    }
  }

  async getArticlesFromSubscribesBlogs(req, res) {
    try {
      const articles = await db.query(
        "SELECT blogs.blog_id, blogs.blog_avatar, blogs.blog_caption, articles.article_id, articles.article_caption, articles.article_content FROM subscribesBlogs, blogs, articles WHERE blogs.blog_id = subscribesBlogs.subscribed_blog_id AND articles.article_blog_id = blogs.blog_id AND subscribesBlogs.subscribed_by_user = $1",
        [req.user.id]
      );

      res.json(articles.rows);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении информации" });
    }
  }

  async getArticleFullInfo(req, res) {
    try {
      const { articleId } = req.body;

      const isArticle = await db.query(
        "SELECT * FROM articles WHERE article_id = $1",
        [articleId]
      );

      if (isArticle.rowCount === 0) {
        return res.status(400).json({ message: "Такой статьи нету" });
      }

      const article = await db.query(
        "SELECT articles.article_user_id, articles.article_banner, articles.article_caption, blogs.blog_caption, blogs.blog_id, articles.article_content FROM articles, blogs WHERE blogs.blog_id = articles.article_blog_id AND articles.article_id = $1",
        [articleId]
      );

      const author = article.rows[0].article_user_id;

      const authorOfArticle = await db.query(
        "SELECT user_login, user_id FROM users WHERE user_id = $1",
        [author]
      );

      const comments = await db.query(
        "SELECT users.user_id, users.user_avatar, users.user_login, comments.comment_id, comments.comment_content, comments.comment_dateCreated FROM users, comments WHERE users.user_id = comments.comment_user_id AND comments.comment_article_id = $1",
        [articleId]
      );

      const info = {
        author: authorOfArticle.rows,
        article: article.rows,
        comments: comments.rows,
      };
      res.json(info);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении информации" });
    }
  }
}

module.exports = new ArticleController();
