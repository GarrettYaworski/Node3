const swag = require('../models/swag')

function add(req, res, next){
 let index = req.session.user.cart.findIndex(swag => swag.id == req.query.id)

 if (index === -1){
     req.session.user.cart.push(swag.find(swag => swag.id == req.query.id))
     req.session.user.total += swag.find(swag => swag.id == req.query.id).price
 }
 res.status(200).send(req.session.user)

}

function remove(req, res, next){
    const selectedItem = swag.find(swag => swag.id == req.query.id)
    let index = req.session.user.cart.findIndex(swag => swag.id == req.query.id)
    req.session.user.total -= selectedItem.price
    req.session.user.cart.splice(index, 1)
    res.status(200).send(req.session.user)
}

function checkout(req, res, next){
    req.session.user.cart = []
    req.session.user.total = 0
    res.status(200).send(req.session.user)

}

module.exports = {
    add,
    remove,
    checkout
}