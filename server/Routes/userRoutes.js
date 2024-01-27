const router = require("express").Router();
const { register, login, avatar, snaptalk } = require("../Controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", avatar);
router.get("/snaptalk/:id", snaptalk);

module.exports = router;