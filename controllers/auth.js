var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Member = require("../model/Member");

exports.signin = (req, res) => {
    const mem = Member.findOne({
        name: req.body.name
    })
        .exec((err, member) => {
            if (err) {
                res.status(500)
                    .send({
                        message: err
                    });
                return;
            }
            if (!member) {
                return res.status(404)
                    .send({
                        message: "Member Not found."
                    });
            }

            //comparing passwords
            // var passwordIsValid = bcrypt.compareSync(
            //     req.body.password,
            //     member.password
            // );
            // // checking if password was valid and send response accordingly
            // if (!passwordIsValid) {
            //     return res.status(401)
            //         .send({
            //             accessToken: null,
            //             message: "Invalid Password!"
            //         });
            // }
            //signing token with member id
            var token = jwt.sign({
                id: member.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            res.status(200)
                .send({
                    member: mem,
                    message: "Login successfull",
                    accessToken: token,
                });
        });
};