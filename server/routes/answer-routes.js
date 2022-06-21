const Router = require("express");
const router = new Router();
const answerController = require("../controllers/answerComment-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/answer", authMiddleware, answerController.createAnswer);
router.delete("/answer", authMiddleware, answerController.deleteAnswer);

module.exports = router;
