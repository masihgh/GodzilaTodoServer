const jwt = require("jsonwebtoken")


const verifyUserToken = (req, res, next) => {
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
                next() //proceed to the next action in the calling function
            }
        }) //end of jwt.verify()
    }else{
        res.status(403).send({ msg: "Unauthorized" })
    }

}

module.exports = verifyUserToken