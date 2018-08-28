const swag = require('../models/swag')

function search(req, res, next){
    if(!req.query.category || (swag.find(swag => swag.category == req.query.category) == -1)){
        res.status(200).send(swag)
    }
    let filtSwag = swag.filter(swag => swag.category == req.query.category)
    res.status(200).send(filtSwag)
}

module.exports = {
    search
}