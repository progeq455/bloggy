const Router = require("express");
const router = new Router();
const blogController = require("../controllers/blog-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/blogs", authMiddleware, blogController.createBlog);
router.post("/blogs/subscribe", authMiddleware, blogController.subscribeToBlog);
router.get("/blogs/:id", authMiddleware, blogController.getBlogAndArticles);
router.put("/blogs", authMiddleware, blogController.updateBlog);
router.delete("/blogs", authMiddleware, blogController.deleteBlog);

module.exports = router;
