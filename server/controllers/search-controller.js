const db = require("../db");

class SearchController {
  async searchUsers(req, res) {
    try {
      const { query } = req.query;

      if (query.length < 1) {
        return res.status(400).json({ message: "Некорректное значение" });
      }

      const users = await db.query(
        "SELECT user_id, user_avatar, user_login FROM users WHERE user_login LIKE $1",
        [`%${query}%`]
      );

      res.json(users.rows);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при поиске информации" });
    }
  }
}

module.exports = new SearchController();
