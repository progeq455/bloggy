const Router = require("express");
const router = new Router();
const articleController = require("../controllers/article-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/article", authMiddleware, articleController.createArticle);
router.get(
  "/article/blogs",
  authMiddleware,
  articleController.getArticlesFromSubscribesBlogs
);
router.get(
  "/article/full",
  authMiddleware,
  articleController.getArticleFullInfo
);
router.put("/article", authMiddleware, articleController.updateArticle);
router.delete("/article", authMiddleware, articleController.deleteArticle);

module.exports = router;
