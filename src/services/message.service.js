const e = require("cors");
const prisma = require("../configs/prisma")
const conversationService = require("./conversation.service"); 

const addMessage = async (addMessageRequestDTO, tx = prisma) => {
    const {conversationId, senderId, receiverId, message} = addMessageRequestDTO

    let conversation = await conversationService.getOrCreatePersonalConversation(conversationId, senderId, receiverId);

    const messageEntity = await tx.message.create({
        data:{
            conversationId : conversation.id,
            senderId,
            message
        }
    })

    return mapToMessageResponceDTO(messageEntity);
}

const getConversationMessages = async (conversationId, tx = prisma) => {
    const messageEntities = await tx.message.findMany({
        where:{
            conversationId
        }
    })

    const messages = []

    messageEntities.forEach(m => {
        messages.push(mapToMessageResponceDTO(m));
    });

    return messages
}

const deleteMessage = async (messageId, tx = prisma) => {
    return await tx.message.delete({
        where:{
            id:messageId
        }
    })
} 

const mapToMessageResponceDTO = (messageEntity) => {
    return {
        senderId: messageEntity.senderId,
        message: messageEntity.message
    }
}

module.exports = {
    addMessage,
    getConversationMessages,
    deleteMessage
}