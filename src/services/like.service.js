const prisma = require("../configs/prisma")
const contentService = require("../services/content.service")
const userService = require("../services/user.service")

const likeContent = async (likeRequestDTO, tx = prisma) => {
    return await prisma.$transaction(async (tx) => {
        const like = await tx.like.create({
            data: likeRequestDTO
        })

        const content = await contentService.incrementLikeCount(like.contentId, tx);

        return like;
    })
}

const undoLike = async (undoLikeRequestDTO, tx = prisma) => {
    return await prisma.$transaction(async (tx) => {
        const like = await tx.like.delete({
            where: {
                contentId_userId: undoLikeRequestDTO
            }
        })

        const content = await contentService.decrementLikeCount(like.contentId, tx);

        return like;
    })
}

const getUserLikedContent = async (userId, tx = prisma) => {
    const likes = await tx.like.findMany({
        where:{
            userId
        }
    })

    const contents = [];

    for(let i = 0; i < likes.length; i++)
    {
        const content = await contentService.getContent(likes[i].contentId)
        contents.push(content)
    }

    return contents;
}

const getUsersWhoLikedThisContent = async (contentId, tx = prisma) => {
    const likes = await tx.like.findMany({
        where:{
            contentId
        }
    })

    const users = []

    for(let i = 0; i < likes.length; i++)
    {
        const user = await userService.getUserById(likes[i].userId);
        users.push(user)
    }

    return users;
}

module.exports = {
    likeContent,
    undoLike,
    getUserLikedContent,
    getUsersWhoLikedThisContent
}