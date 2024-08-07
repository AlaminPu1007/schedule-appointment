/**
 * Error handler middleware to handle and log errors.
 *
 * @param {Error} err - The error object.
 * @param {Express.Response} res - The Express response object.
 * @return {void}
 */

exports.errorHandler = (err, res) => {
    console.error(err.message);
    res.status(500).send("Server Error");
};
