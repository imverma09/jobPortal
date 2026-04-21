const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// ---- Auth middleware (reusable) ----
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) return res.status(401).json({ message: 'Please login first' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { authenticate };