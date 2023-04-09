const jwt = require("jsonwebtoken")


const verifyUserAdmin = (req, res, next) => {
    if (req.headers["authorization"]){
        const authHeader = req.headers["authorization"]
        const token = authHeader.split(" ")[1]

        if (token == null) res.sendStatus(400).send({ msg: "Token not present" })
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).send({ msg: "Unauthorized" })
            }
            else {
                req.user = user
                if (req.user.user_is_admin !== 'normal') {
                    next();
                }
                return res.status(401).json({ msg: "Unauthorized!"});
            }
        }) //end of jwt.verify()
    }else{
        res.status(403).send({ msg: "Unauthorized" })
    }

}

module.exports = verifyUserAdmin