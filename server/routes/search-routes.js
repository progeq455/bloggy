const Router = require("express");
const router = new Router();
const searchController = require("../controllers/search-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/search/users", authMiddleware, searchController.searchUsers);

module.exports = router;
