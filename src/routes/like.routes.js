const express = require("express")
const likeController = require("../controllers/like.controller")

const router = express.Router();

router.post("/", likeController.likeContent);
router.delete("/", likeController.undoLike);
router.get("/by-user/:userId", likeController.getUserLikedContent)
router.get("/by-content/:contentId", likeController.getUsersWhoLikedThisContent);

module.exports = router;