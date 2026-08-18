const express = require("express")
const messageController = require("../controllers/message.controller")

const router = express.Router();

router.post("/", messageController.addMessage);
router.get("/by-conversation/:conversationId", messageController.getConversationMessages)
router.delete("/:messageId", messageController.deleteMessage)

module.exports = router;