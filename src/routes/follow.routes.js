const express = require("express")
const followController = require("../controllers/follow.controller")

const router = express.Router();

router.post("/", followController.followUser)
router.get("/user-follower/:id", followController.getUserFollowers)
router.get("/user-following/:id", followController.getUserFollowing)
router.delete("/", followController.unfollowUser);

module.exports = router;