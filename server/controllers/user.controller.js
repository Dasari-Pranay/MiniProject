import User from "../models/user_model.js";


export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User found",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error fetching user: ${error}`
        });
    }
}