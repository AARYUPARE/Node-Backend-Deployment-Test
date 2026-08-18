const { symbol, email } = require("zod");
const userService = require("../services/user.service")
const {userCreateRequestSchema, userUpdateRequestSchema} = require("../validators/user.validator")
const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util"); 
const ValidationError = require("../exceptions/ValidationError");

const createUser = async (req, res) => 
{
    const userToSave = validateSchema(userCreateRequestSchema, req.body);
    const savedUser = await userService.createUser(userToSave);
    return res.status(201).json(savedUser);
}

const getAllUsers = async (req, res) => 
{
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
}

const getUserById = async (req, res) => 
{
    if(req.params.id === null || req.params.userId === null)
        throw new ValidationError("parameter: id required");

    let id = checkAndReturnNumber(req.params.id || req.params.userId);

    const user = await userService.getUserById(id);
    return res.status(200).json(user);
}

const getUserByEmail = async (req, res) => 
{
    if(req.params.email === null)
        throw new ValidationError("parameter: email required");


    const user = await userService.getUserByEmail(req.params.email);

    return res.status(200).json(user);
}

const updateUser = async (req, res) =>
{
    if(req.params.id === null || req.params.userId === null)
        throw new ValidationError("parameter: id required");

    const userToUpdate = validateSchema(userUpdateRequestSchema, req.body);
    let id = checkAndReturnNumber(req.params.id || req.params.userId);

    const updatedUser = await userService.updateUserById(id, userToUpdate);

    return res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) => 
{
    if(req.params.id === null || req.params.userId === null)
        throw new ValidationError("parameter: id required");

    let id = checkAndReturnNumber(req.params.id || req.params.userId);

    const deletionRes = await userService.deleteUserById(id);

    return res.status(204);
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
}