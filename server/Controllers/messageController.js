const messageModel = require("../Models/messageModel");
const User = require("../Models/messageModel");

module.exports.addMessage = async ( req, res, next ) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [ from, to ],
            sender: from,
        });
        if(data) {
            return res.json({ message: "Message Added Successfully "});
        }
        else {
            return res.json({ message: "Message Addition Failed "});
        }
    }
    catch(err) {
        console.log(`MessageController: AddMessage Error: ${err.message}`);
        next(err)
    }
}

module.exports.getAllMessages = async (req, res, next ) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [ from, to ],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.json(projectedMessages);
    }
    catch(err) {
        console.log(`MessageController: GetAllMessage Error: ${err.message}`);
        next(err);
    }
}