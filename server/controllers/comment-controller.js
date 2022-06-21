const db = require("../db");

class CommentController {
  async createComment(req, res) {
    try {
      const { content, articleId } = req.body;

      const isArticle = await db.query(
        "SELECT * FROM articles WHERE article_id = $1",
        [articleId]
      );

      if (isArticle.rowCount === 0) {
        return res.status(400).json({ message: "Такой статьи не существует" });
      }

      if (!content) {
        return res.status(400).json({ message: "Некорректный контент" });
      }

      if (content.length < 1) {
        return res.status(400).json({ message: "Некорректный контент" });
      }

      const dateCreated = new Date().toLocaleDateString();

      const newComment = await db.query(
        "INSERT INTO comments (comment_article_id, comment_user_id, comment_content, comment_dateCreated) VALUES ($1, $2, $3, $4) RETURNING *",
        [articleId, req.user.id, content, dateCreated]
      );
      res.json(newComment.rows[0]);
    } catch (e) {
      res.status(400).json({ message: "Ошибка создания блога" });
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.body;

      const comment = await db.query(
        "SELECT * FROM comments WHERE comment_id = $1 AND comment_user_id = $2",
        [id, req.user.id]
      );

      if (comment.rowCount === 0) {
        return res.status(400).json({ message: "Такого комментария нету" });
      }

      await db.query(
        "DELETE FROM comments WHERE comment_id = $1 AND comment_user_id = $2",
        [id, req.user.id]
      );

      res.json({ message: "Комментарий удален" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка при удалении комментария" });
    }
  }
}

module.exports = new CommentController();
