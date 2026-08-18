class ValidationError extends Error
{
    constructor(errors)
    {
        super("Va;idation Error");
        this.statusCode = 400;
        this.name = "Bad Request";
        this.errors = errors;
    }
}

module.exports = ValidationError;