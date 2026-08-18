const express = require("express")
const contentController = require("../controllers/content.controller")

const router = express.Router();

router.post("/", contentController.createContent);
router.get("/by-user/:userId", contentController.getUserContent);
router.delete("/:id", contentController.deleteContent);

module.exports = router;