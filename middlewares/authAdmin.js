exports.IsAdmin = async (req, res, next) => {
    if (req.user.user_is_admin !== 'normal') {
        next();
    }
    return res.status(401).json({ msg: "Unauthorized!"});
}