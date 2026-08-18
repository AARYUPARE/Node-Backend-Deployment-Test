const prisma = require("../configs/prisma")
const bcrypt = require("bcrypt")

const createUser = async (userCreateRequestDTO) => {

    const hashedPassword = await bcrypt.hash(
        userCreateRequestDTO.password,
        12
    )

    const user = await prisma.user.create({
        data:{
            ...userCreateRequestDTO,
            password: hashedPassword
        }
    });

    return userToUserResposeDTO(user);
}

const getAllUsers = async () => {
    let users = await prisma.user.findMany() || [];

    let userResponseDTOs = [];

    users.forEach(user => {
        userResponseDTOs.push(userToUserResposeDTO(user))
    });

    return userResponseDTOs;
}

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if (user === null)
        throw ResourseNotFoundException("User with id " + id + " not found");

    return userToUserResposeDTO(user);
}

const getUserByEmail = async (email) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const responseDTO = userToUserResposeDTO(user);
    return responseDTO;
}

const updateUserById = async (id, userUpdateRequestDTO) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: userUpdateRequestDTO
    })

    return userToUserResposeDTO(user)
}

const deleteUserById = async (id) => {
    await prisma.user.delete({
        where: {
            userId: id
        }
    })

    return true;
}

const userToUserResposeDTO = (user) => {
    if (user === null)
        return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    userToUserResposeDTO
}