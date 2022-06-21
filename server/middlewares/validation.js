module.exports = function (req, res, next) {
  const { email, login, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![email, login, password].every(Boolean)) {
      return res.status(401).json({ message: "Пропущены поля" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ message: "Некорректный Email" });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json({ message: "Пропущены поля" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ message: "Некорректный Email" });
    }
  }

  next();
};
