const express = require('express');
const router = express.Router(); // fixed express.Router()
const bcrypt = require('bcryptjs'); // bycript
const jwt = require('jsonwebtoken');

const { User } = require('../db'); // import is redundant

const findUser = (req) => User.findOne({ where: { username: req.body.username } });
router.post('/signup',  (req, res) => {
console.log('FIND USER: ', findUser(req))
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.passwordHash;
    User.create({
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(password, salt),
    })
        .then(
            function signupSuccess(user) {
                let token = jwt.sign({ id:
                    user.id
                }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },

            function signupFail(err) {
                res.status(500).send(err.message)
            })
})

router.post('/signin', (req, res, next) => {
    // console.log('SIGN IN req: ', req.body)
    User.findOne({ where: { username: req.body.username } }).then(user => {
        // console.log('USER:::::: ', user)
        if (user) {
            bcrypt.compare(req.body.passwordHash, user.passwordHash, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                    next();
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });

        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;
