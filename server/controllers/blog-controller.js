const db = require("../db");
const config = require("config");
const Uuid = require("uuid");
const fs = require("fs");
const blogTransferFiles = require("../utils/blogFilesTransfer");
const blogUpdateTransferFiles = require("../utils/blogUpdateFilesTransfer");

class BlogController {
  async createBlog(req, res) {
    try {
      let avatarName;
      let bannerName;

      if (!req.files) {
        avatarName = "";
        bannerName = "";
      } else {
        const filesNames = blogTransferFiles(
          req.files.avatar,
          req.files.banner
        );
        avatarName = filesNames.avatarName;
        bannerName = filesNames.bannerName;
      }

      let { caption, description } = req.body;

      if (!caption) {
        return res.status(400).json({ message: "Некорректное название" });
      }

      if (caption.length < 1) {
        return res.status(400).json({ message: "Некорректное название" });
      }

      if (!description) {
        description = "";
      }

      const newBlog = await db.query(
        "INSERT INTO blogs (blog_user_id, blog_avatar, blog_banner, blog_caption, blog_description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [req.user.id, avatarName, bannerName, caption, description]
      );
      res.json(newBlog.rows[0]);
    } catch (e) {
      res.status(400).json({ message: "Ошибка создания блога" });
    }
  }

  async updateBlog(req, res) {
    try {
      let { caption, description, id } = req.body;

      const getBlog = await db.query(
        "SELECT * FROM blogs WHERE blog_user_id = $1 AND blog_id = $2",
        [req.user.id, id]
      );

      if (getBlog.rowCount === 0) {
        return res.status(400).json({ message: "Такого блога нету" });
      }

      if (!caption) {
        caption = getBlog.rows[0].blog_caption;
      }

      if (!description) {
        description = getBlog.rows[0].blog_description;
      } else if (!description && getBlog.rows[0].blog_description === "") {
        description = "";
      }

      let avatarName = "";
      let bannerName = "";

      if (!req.files) {
        avatarName = getBlog.rows[0].blog_avatar;
        bannerName = getBlog.rows[0].blog_banner;
      } else {
        const filesNames = blogUpdateTransferFiles(
          req.files.avatar,
          req.files.banner,
          getBlog.rows[0].blog_avatar,
          getBlog.rows[0].blog_banner
        );
        avatarName = filesNames.avatarName;
        bannerName = filesNames.bannerName;
      }

      if (avatarName === undefined && getBlog.rows[0].blog_avatar !== "") {
        avatarName = getBlog.rows[0].blog_avatar;
      } else if (avatarName === undefined) {
        avatarName = "";
      }

      if (bannerName === undefined && getBlog.rows[0].blog_banner !== "") {
        bannerName = getBlog.rows[0].blog_banner;
      } else if (bannerName === undefined) {
        bannerName = "";
      }

      const newBlog = await db.query(
        "UPDATE blogs SET blog_caption = $1, blog_description = $2, blog_avatar = $3, blog_banner = $4 WHERE blog_id = $5 AND blog_user_id = $6 RETURNING *",
        [caption, description, avatarName, bannerName, id, req.user.id]
      );

      res.json(newBlog.rows[0]);
    } catch (e) {
      res.status(500).json({ message: "Ошибка изменения блога" });
    }
  }

  async deleteBlog(req, res) {
    try {
      const { id } = req.body;

      const blog = await db.query(
        "SELECT * FROM blogs WHERE blog_id = $1 AND blog_user_id = $2",
        [id, req.user.id]
      );

      if (blog.rowCount === 0) {
        return res.status(400).json({ message: "Такого блога нету" });
      }

      if (blog.rows[0].blog_avatar) {
        fs.unlinkSync(
          config.get("staticBlogsAvatars") + "/" + blog.rows[0].blog_avatar
        );
      }

      if (blog.rows[0].blog_banner) {
        fs.unlinkSync(
          config.get("staticBlogsBanners") + "/" + blog.rows[0].blog_banner
        );
      }

      await db.query(
        "DELETE FROM blogs WHERE blog_id = $1 AND blog_user_id = $2",
        [id, req.user.id]
      );

      res.json({ message: "Блог удален" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка при удалении блога" });
    }
  }

  async subscribeToBlog(req, res) {
    try {
      const { idBlog } = req.body;

      const isBlog = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [
        idBlog,
      ]);

      if (isBlog.rowCount === 0) {
        return res.status(400).json({ message: "Нету такого блога" });
      }

      const isSubscribe = await db.query(
        "SELECT * FROM subscribesBlogs WHERE subscribed_blog_id = $1 AND subscribed_by_user = $2",
        [idBlog, req.user.id]
      );

      if (isSubscribe.rowCount !== 0) {
        await db.query(
          "DELETE FROM subscribesBlogs WHERE subscribed_blog_id = $1 AND subscribed_by_user = $2 RETURNING *",
          [idBlog, req.user.id]
        );

        res.json(false);
      } else {
        await db.query(
          "INSERT INTO subscribesBlogs (subscribed_blog_id, subscribed_by_user) VALUES ($1, $2) RETURNING *",
          [idBlog, req.user.id]
        );

        res.json(true);
      }
    } catch (e) {
      res.status(500).json({ message: "Ошибка подписки на блог" });
    }
  }

  async getBlogAndArticles(req, res) {
    try {
      const idBlog = req.params.id;

      const blog = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [
        idBlog,
      ]);

      if (blog.rowCount === 0) {
        return res.status(400).json({ message: "Такого блога нету" });
      }

      const author = blog.rows[0].blog_user_id;

      const authorOfBlog = await db.query(
        "SELECT user_login, user_id FROM users WHERE user_id = $1",
        [author]
      );

      const subs = await db.query(
        "SELECT * FROM subscribesBlogs WHERE subscribed_blog_id = $1",
        [idBlog]
      );

      const countSubs = subs.rowCount;

      const articles = await db.query(
        "SELECT blogs.blog_id, blogs.blog_avatar, articles.article_id, articles.article_caption, blogs.blog_caption, articles.article_content, articles.article_dateCreated FROM blogs, articles WHERE blogs.blog_id = articles.article_blog_id AND articles.article_blog_id = $1",
        [idBlog]
      );

      let subscribedToBlog = false;

      const checkSubscribe = await db.query(
        "SELECT * FROM subscribesBlogs WHERE subscribed_blog_id = $1 AND subscribed_by_user = $2",
        [idBlog, req.user.id]
      );

      if (checkSubscribe.rowCount !== 0) {
        subscribedToBlog = true;
      }

      const info = {
        author: authorOfBlog.rows[0],
        blog: blog.rows[0],
        subscribedToBlog: subscribedToBlog,
        countSubscribers: countSubs,
        articlesOfBlog: articles.rows,
      };

      res.json(info);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при получении информации" });
    }
  }
}

module.exports = new BlogController();
