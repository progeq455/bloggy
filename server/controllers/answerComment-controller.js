const db = require("../db");

class AnswerCommentController {
  async createAnswer(req, res) {
    try {
      const { content, commentId } = req.body;

      const isComment = await db.query(
        "SELECT * FROM comments WHERE comment_id = $1",
        [commentId]
      );

      if (isComment.rowCount === 0) {
        return res
          .status(400)
          .json({ message: "Такого комментария не существует" });
      }

      if (!content) {
        return res.status(400).json({ message: "Некорректный контент" });
      }

      if (content.length < 1) {
        return res.status(400).json({ message: "Некорректный контент" });
      }

      const dateCreated = new Date().toLocaleDateString();

      const newAnswer = await db.query(
        "INSERT INTO answersComments (answer_comment_id, answer_user_id, answer_content, answer_dataCreated) VALUES ($1, $2, $3, $4) RETURNING *",
        [commentId, req.user.id, content, dateCreated]
      );
      res.json(newAnswer.rows[0]);
    } catch (e) {
      res.status(400).json({ message: "Ошибка создания ответа" });
    }
  }

  async deleteAnswer(req, res) {
    try {
      const { id } = req.body;

      const answer = await db.query(
        "SELECT * FROM answersComments WHERE answer_id = $1 AND answer_user_id = $2",
        [id, req.user.id]
      );

      if (answer.rowCount === 0) {
        return res.status(400).json({ message: "Такого ответа нету" });
      }

      await db.query(
        "DELETE FROM answersComments WHERE answer_id = $1 AND answer_user_id = $2",
        [id, req.user.id]
      );

      res.json({ message: "Ответ удален" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка при удалении ответа" });
    }
  }
}

module.exports = new AnswerCommentController();
