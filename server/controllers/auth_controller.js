const users = require('../models/users')
let id = 1;

function login(req, res, next){
    const user = users.find( user => user.username === req.body.username && user.password === req.body.password );

    if(user){
        req.session.user.username = user.username;
        res.status(200).send(session.user)
    }else{
        res.sendStatus(500)
    }
}
function register(req, res, next){
    if(req.body.username && req.body.password){
        users.push({
            id,
            username: req.body.username,
            password: req.body.password
        })
        id++
        req.session.user.username = req.body.username
        res.status(200).send(req.session.user)
    }
}
function signout(req, res, next){
    req.session.destroy()
    res.status(200).send(req.session)
}
function getUser(req, res, next){
    res.status(200).send(req.session.user)
}

module.exports = {
    login,
    register,
    signout,
    getUser
}