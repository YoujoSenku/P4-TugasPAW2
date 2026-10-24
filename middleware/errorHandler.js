const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // 1. Handling ID salah format di Mongoose (seperti ID = "1")
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Format ID tidak valid';
    }

    // 2. Handling gagal validasi skema Mongoose (misal field wajib diisi)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    // 3. Handling data duplikat (misal unique index pada field)
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Data sudah terdaftar dalam sistem';
    }

    res.status(statusCode).json({
        status: statusCode >= 500 ? 'error' : 'fail',
        statusCode,
        message
    });
};

module.exports = errorHandler;