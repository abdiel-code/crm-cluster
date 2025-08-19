import jwt from "jsonwebtoken";
import envData from "../config/envData.js";
const JWT_SECRET = envData.jwt.secret;

const validateSocketToken = (socket, next) => {
    const token = socket.handshake.headers.cookie
    ?.split(';')
    ?.find(c => c.trim().startsWith('token='))
    ?.split('=')[1];

    if (!token) {
        return next(new Error("Authentication error: No token provided"));
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error: Invalid token"));
        }

        socket.user = decoded;
        next();
    }
    );
}

export default validateSocketToken;