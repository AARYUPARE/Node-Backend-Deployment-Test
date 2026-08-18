class ResourseNotFoundException extends Error
{
    constructor(errors)
    {
        super("Resourse Not Found");
        this.statusCode = 404;
        this.errors = errors;
        this.name = "ResourseNotFound";
    }
}

module.exports = ResourseNotFoundException