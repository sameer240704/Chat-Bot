const router = require("express").Router();
const { addMessage, getAllMessages } = require("../Controllers/messageController");

router.post("/addmsg/", addMessage);
router.post("/getallmsg/", getAllMessages);

module.exports = router;