const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const validate = require("../middlewares/validation");
const auth = require("../middlewares/auth-middleware");
const jwtGenerator = require("../utils/generateJwt");

router.post("/register", validate, async (req, res) => {
  const { email, login, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким Email уже зарегистрирован" });
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await db.query(
      "INSERT INTO users (user_login, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [login, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    const userParsed = {
      id: newUser.rows[0].user_id,
      login: newUser.rows[0].user_login,
      email: newUser.rows[0].user_email,
      avatar: newUser.rows[0].user_avatar,
      about: newUser.rows[0].user_about,
    };

    return res.json({ jwtToken, userParsed });
  } catch (err) {
    res.status(500).json({ message: "Ошибка на сервере" });
  }
});

router.post("/login", validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким Email не найден" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Неправильный Email или пароль" });
    }

    const userParsed = {
      id: user.rows[0].user_id,
      login: user.rows[0].user_login,
      email: user.rows[0].user_email,
      avatar: user.rows[0].user_avatar,
      about: user.rows[0].user_about,
    };

    const jwtToken = jwtGenerator(user.rows[0].user_id);

    return res.json({ jwtToken, userParsed });
  } catch (err) {
    res.status(500).json({ message: "Ошибка на сервере" });
  }
});

router.post("/verify", auth, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
      req.user.id,
    ]);

    const jwtToken = jwtGenerator(user.rows[0].user_id);

    const userParsed = {
      id: user.rows[0].user_id,
      login: user.rows[0].user_login,
      email: user.rows[0].user_email,
      avatar: user.rows[0].user_avatar,
      about: user.rows[0].user_about,
    };

    res.json({ jwtToken, userParsed });
  } catch (err) {
    res.status(500).json({ message: "Ошибка на сервере" });
  }
});

module.exports = router;
