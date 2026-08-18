const likeService = require("../services/like.service")
const { likeRequestSchema, undoLikeRequestDTO } = require("../validators/like.validator")
const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util")

const likeContent = async (req, res) => {
    const likeToAdd = validateSchema(likeRequestSchema, req.body);
    const like = await likeService.likeContent(likeToAdd);
    return res.status(201).json(like);
}

const undoLike = async (req, res) => {
    const likeToUndo = validateSchema(undoLikeRequestDTO, req.body);
    const like = await likeService.undoLike(likeToUndo);
    return res.status(204).send();
}

const getUserLikedContent = async (req, res) => {
    const userId = checkAndReturnNumber(req.params.userId);
    const content = await likeService.getUserLikedContent(userId);
    return res.status(200).json(content);
}

const getUsersWhoLikedThisContent = async (req, res) => {
    const contentId = checkAndReturnNumber(req.params.contentId);
    const users = await likeService.getUsersWhoLikedThisContent(contentId);
    return res.status(200).json(users);
}

module.exports = {
    likeContent,
    undoLike,
    getUserLikedContent,
    getUsersWhoLikedThisContent
}