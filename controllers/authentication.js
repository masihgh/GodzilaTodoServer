const Member = require('../model/Member')
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const user = await Member.findOne({ name: req.body.name });
        if (user) {
            // const validPass = await bcrypt.compare(req.body.password, user.password);
            // if (!validPass) return res.status(401).send("Mobile/Email or Password is wrong");

            // Create and assign token
            let payload = { id: user._id, user_is_admin: user.is_admin };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);

            res.status(200).header("auth-token", token).send({ "token": token });
        }
        else {
            res.status(401).json({ msg: 'invalid token or user dose not exsists' });
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }


}
const AuthUser = async (req, res) => {
    console.log(req.user);
    try {
        const user = await Member.findById(req.user.id);
        res.status(200).send({ "user": user });

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const Logout = async (req, res) => {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) {
            res.send({ msg: 'You have been Logged Out' });
        } else {
            res.send({ msg: 'Error' });
        }
    });
}

module.exports = {
    login, AuthUser, Logout
}