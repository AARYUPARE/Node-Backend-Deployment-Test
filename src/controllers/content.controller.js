const ValidationError = require("../exceptions/ValidationError");
const contentService = require("../services/content.service")
const {contentCreateSchema} = require("../validators/content.validator")
const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util")

const createContent = async (req, res) => {
    const contentToSave = validateSchema(contentCreateSchema, req.body);
    const content = await contentService.createContent(contentToSave);
    return res.status(201).json(content);
}

const getUserContent = async (req, res) => {

    const userId = checkAndReturnNumber(req.params.userId);
    const userContent = await contentService.getUserContent(userId);
    return res.status(200).json(userContent);
}

const deleteContent = async (req, res) => {
    const id = checkAndReturnNumber(req.param.id);
    await contentService.deleteContent(id);
    return res.status(204);
}

module.exports = {
    createContent, 
    getUserContent, 
    deleteContent
}