const authService = require("../services/auth.service")
const userService = require("../services/user.service")
const { authLoginRequestSchema } = require("../validators/auth.validator");
const { userCreateRequestSchema } = require("../validators/user.validator");
const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util")

const login = async (req, res) => {
    const authLoginRequestDTO = validateSchema(authLoginRequestSchema, req.body);
    const authRes = await authService.login(authLoginRequestDTO);
    return res.status(200).json(authRes);
}

const register = async (req, res) => {
    const userToCreate = validateSchema(userCreateRequestSchema, req.body);
    const user = await userService.createUser(userToCreate);
    return res.status(201).json(user);
}

module.exports = {
    login,
    register
}