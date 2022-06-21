const Router = require("express");
const router = new Router();
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/user/me", authMiddleware, userController.getAboutMe);
router.get("/user/subscribes", authMiddleware, userController.getMySubscribes);
router.get("/user/about", authMiddleware, userController.getUserAndHisBlogs);
router.put("/user", authMiddleware, userController.updateUser);

module.exports = router;
