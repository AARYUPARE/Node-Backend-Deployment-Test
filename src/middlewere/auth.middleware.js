const jwt = require("jsonwebtoken")
const UnAuthorizedException = require("../exceptions/UnAuthorizedException")

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader)
        throw new UnAuthorizedException("Authentication required")

    const [scheme, token] = authHeader.split(" ")

    if (scheme !== "Bearer" || !token)
        throw new UnAuthorizedException("Invalid authorization header");

    try
    {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded

        next()
    }
    catch(e)
    {
        throw new UnAuthorizedException("Invalid or expired token");
    }
}

module.exports = authenticate