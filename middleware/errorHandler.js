
export default function errorHandler(err, res) {
    return res.status(err.code).json({
        err
    })
}