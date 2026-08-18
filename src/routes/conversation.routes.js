const express = require("express")
const conversationController = require("../controllers/conversation.controller")

const router = express.Router();

router.post("/", conversationController.createConversation);
router.get("/:conversationId", conversationController.getConversationById);
router.get("/by-user/:userId", conversationController.getUserConversation)
router.put("/add-members", conversationController.addMembers);
router.delete("/remove-member", conversationController.removeMember);
router.delete("/:conversationId", conversationController.deleteConversation);

module.exports = router;