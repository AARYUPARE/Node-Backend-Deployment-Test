const prisma = require("../configs/prisma")
const bcrypt = require("bcrypt");
const UnAuthorizedException = require("../exceptions/UnAuthorizedException");
const jwt = require("jsonwebtoken")

const login = async (authLoginRequestDTO, tx = prisma) => 
{
    const {email, password} = authLoginRequestDTO;

    const user = await tx.user.findUnique({
        where:{
            email
        }
    })

    if(user === null)
        throw new UnAuthorizedException();

    const res = await bcrypt.compare(password, user.password);

    if(res === false)
        throw new UnAuthorizedException();

    const token = jwt.sign(
        {
            userId: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token
    }
}

module.exports = {
    login
}