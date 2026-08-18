const express = require("express")

const userController = require("../controllers/user.controller")

const router = express.Router();

router.post("/", userController.createUser) 
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.get("/email/:email", userController.getUserByEmail)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router;