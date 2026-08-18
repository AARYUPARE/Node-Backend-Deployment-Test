class UnAuthorizedException extends Error 
{    
    constructor(message = "Unauthorized User")
    {
        super(message)

        this.statusCode = 401;
        this.name = "UnAuthorizedException";
        this.message = message
    }
}

module.exports = UnAuthorizedException;