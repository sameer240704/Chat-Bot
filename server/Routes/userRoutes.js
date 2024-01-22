const router = require("express").Router();
const { register, login, avatar } = require("../Controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", avatar);
router.get("/snaptalk/:id", snaptalk);

module.exports = router;