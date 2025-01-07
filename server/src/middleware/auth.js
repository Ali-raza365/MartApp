

import jwt from 'jsonwebtoken';
import { createError } from './errorHandler.js';
import { config } from '../config/config.js';


const verifyToken = async (req, reply) => {
    try {
        const Authorization = req?.headers["authorization"]

        if (!Authorization) return createError(reply, 401, "token required.");
        var token = Authorization?.split(' ')[1];

        if (!token) return createError(reply, 401, "token required.");

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            if (!decoded) return createError(reply, 401, "Invalid token.");

            req.user = decoded
            return true
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return createError(reply, 401, 'Token expired.');
            } else if (error.name === 'JsonWebTokenError') {
                return createError(reply, 401, 'Invalid token.');
            } else {
                return createError(reply, 401, null, error);
            }
        }

    } catch (err) {
        return createError(reply, null, null, err);
    }
}


export { verifyToken }