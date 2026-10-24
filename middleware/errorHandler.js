const errorHandler = (err, req, res, next) => {
    // Jika error memiliki statusCode (misal 404/400), gunakan itu. Jika tidak, default 500 (Server Error)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};

module.exports = errorHandler;