const messageService = require("../services/message.service")
const { addMessageRequestSchema } = require("../validators/message.validator")
const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util")

const addMessage = async (req, res) => {
    const addMessageDTO = validateSchema(addMessageRequestSchema, req.body);
    const message = await messageService.addMessage(addMessageDTO);
    return res.status(201).json(message);
}

const getConversationMessages = async (req, res) => {
    const conversationId = checkAndReturnNumber(req.params.conversationId)
    const messages = await messageService.getConversationMessages(conversationId);
    return res.status(200).json(messages)
}

const deleteMessage = async (req, res) => {
    const messageId = checkAndReturnNumber(req.params.messageId);
    const deleteRes = await messageService.deleteMessage(messageId);
    return res.status(204).send();
}

module.exports = {
    addMessage,
    getConversationMessages, 
    deleteMessage
}