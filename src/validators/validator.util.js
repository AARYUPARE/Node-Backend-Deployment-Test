const z = require("zod")
const ValidationError = require("../exceptions/ValidationError");

const validateSchema = (validator, body) => 
{
    const validationResult = validator.safeParse(body);

    if(!validationResult.success)
    {
        throw new ValidationError(validationResult.error.issues)
    }

    return validationResult.data;
}

const checkAndReturnNumber = (value) => {

    const validationResult = z.coerce.number().safeParse(value);

    if (!validationResult.success) {
        throw new ValidationError(
            validationResult.error.issues
        );
    }

    return validationResult.data;
};

module.exports = {
    validateSchema,
    checkAndReturnNumber
};