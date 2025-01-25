import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const authenticateUser = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Missing Credentials");
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            throw new ApiError(401, "Invalid access token");
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(401, "Access token expired");
        }
        throw new ApiError(401, "Invalid access token");
    }
};

const authenticateAdmin = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Missing Credentials");
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken) {
            throw new ApiError(401, "Invalid access token");
        }

        if (decodedToken.role !== "admin") {
            throw new ApiError(401, "You are not authorized to access this route");
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(401, "Access token expired");
        }
        throw new ApiError(401, "Invalid access token");
    }
};

export { authenticateUser,authenticateAdmin };
