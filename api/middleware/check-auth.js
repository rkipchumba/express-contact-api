const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Extract the JWT token from the 'Authorization' header
        const token = req.headers.authorization.split(" ")[1];

        // Verify the token using the provided JWT_KEY
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Attach the decoded user data to the request for future use
        req.userData = decoded;

        // Continue to the next middleware or route
        next();
    } catch (error) {
        // If token verification fails, return a 401 (Unauthorized) response
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
