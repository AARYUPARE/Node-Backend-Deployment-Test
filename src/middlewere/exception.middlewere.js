const errorHandler = (err, req, res, next) => {

    console.error(err);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        name: err.name || "InternalServerError",
        errors: err.errors || undefined
    });
};

module.exports = errorHandler;