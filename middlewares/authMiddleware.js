
const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]; // Correct the split logic (space between Bearer and token)
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Authorization failed, token missing",
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Add err and decoded
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Authorization failed, invalid token",
                });
            } else {
                req.body.userId = decoded.userId; // Use decoded instead of decode
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Authorization failed",
            error,
        });
    }
};

module.exports = authMiddleware;
