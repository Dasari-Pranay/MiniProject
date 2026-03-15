import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "User does not have token, Unauthorized"
            });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({
                message: "User token is not valid, Unauthorized"
            });
        }

        req.userId = verifyToken.userId;

        next();

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: `Is Auth error ${error}`
        });

    }
};

export default isAuth;