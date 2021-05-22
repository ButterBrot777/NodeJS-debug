const jwt = require('jsonwebtoken');
const { User } = require('../db');

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();   // allowing options as a method for request
    } else {
        const sessionToken = req.headers.authorization;
        console.log('session token: ', sessionToken);
        if (!sessionToken)
            return res.status(401).send({ auth: false, message: "No token provided." });
        else {
            const myToken = sessionToken.split(' ')[1];
            jwt.verify(myToken, 'lets_play_sum_games_man', (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        console.log(`user: ${user}`)
                        next();
                    },
                        function () {
                            res.status(401).send({ error: "inner not authorized" });
                        })

                } else {
                    res.status(401).send({ error: "outer not authorized" })
                }
            });
        }
    }
}
