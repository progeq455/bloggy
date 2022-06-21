const Router = require("express");
const router = new Router();
const commentController = require("../controllers/comment-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/comment", authMiddleware, commentController.createComment);
router.delete("/comment", authMiddleware, commentController.deleteComment);

module.exports = router;