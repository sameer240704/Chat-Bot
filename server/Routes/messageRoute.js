const router = require("express").Router();
const { addMessage, getAllMessages } = require("../Controllers/messageController");

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessages);

module.exports = router;