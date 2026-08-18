const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util")
const conversationService = require("../services/conversation.service")
const { conversationCreateRequestSchema, membersAddingRequestSchema, removeMemerRequestSchema } = require("../validators/conversation.validator")

const createConversation = async (req, res) => {
    const createRequestDTO = validateSchema(conversationCreateRequestSchema, req.body);
    const convsersation = await conversationService.createConversation(createRequestDTO);
    return res.status(201).json(convsersation);
}

const getConversationById = async (req, res) => {
    const  conversationId = checkAndReturnNumber(req.params.conversationId);
    const conversation = await conversationService.getConversationById(conversationId);
    return res.status(200).json(conversation);
}

const getUserConversation = async (req, res) => {
    const userId = checkAndReturnNumber(req.params.userId);
    const userConversations = await conversationService.getUserConversation(userId);
    return res.status(200).json(userConversations);
}

const deleteConversation = async (req, res) => {
    const  conversationId = checkAndReturnNumber(req.params.convsersationId);
    const convsersation = await conversationService.deleteConversation(conversationId);
    return res.status(204).send();
}

const addMembers = async (req, res) => {
    const addMemberRequestDTO = validateSchema(membersAddingRequestSchema, req.body);
    const conversation = await conversationService.addMember(addMemberRequestDTO);
    return res.status(200).json(conversation);
}

const removeMember = async (req, res) => {
    const removeMemberRequestDTO = validateSchema(removeMemerRequestSchema, req.body);
    const conversation = await conversationService.removeMember(removeMemberRequestDTO);
    return res.status(204).send();
}

module.exports = {
    createConversation,
    getConversationById,
    getUserConversation,
    deleteConversation,
    addMembers,
    removeMember
}