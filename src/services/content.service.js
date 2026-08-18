const prisma = require("../configs/prisma");

const createContent = async (contentCreateRequestDTO, tx = prisma) =>
{
    const content = await tx.content.create({
        data: contentCreateRequestDTO
    })

    return contentToContentResponseDTO(content);
}

const getUserContent = async (userId, tx = prisma) => 
{
    const content = await tx.content.findMany({
        where : {
            userId
        }
    }) || []

    return content.map(c => contentToContentResponseDTO(c));
}

const getContent = async (contentId, tx = prisma) => {
    const content =  await tx.content.findUnique({
        where:{
            id:contentId
        }
    })

    return contentToContentResponseDTO(content);
}

const deleteContent = async (id, tx = prisma) => {
    return await tx.content.delete({
        where: {
            id
        }
    })   
}

const incrementLikeCount = async (id, tx = prisma) => {
    return await tx.content.update({
        where: {
            id
        },
        data :{
            likeCount:{
                increment: 1
            }
        }
    })
}

const decrementLikeCount = async (id, tx = prisma) => {
    return await tx.content.update({
        where: {
            id,
            likeCount:{
                gt: 0
            }
        },
        data :{
            likeCount:{
                decrement: 1
            }
        }
    })
}

const contentToContentResponseDTO = (content) =>
{
    return (content && {
        id: content.id,
        contentUrl: content.contentUrl,
        likeCount: content.likeCount,
        commentCount: content.commentCount,
        shareCount: content.shareCount,
        contentType: content.contentType
    }) || null
}

module.exports = {
    createContent,
    getUserContent, 
    deleteContent,
    contentToContentResponseDTO,
    incrementLikeCount,
    decrementLikeCount,
    getContent
}