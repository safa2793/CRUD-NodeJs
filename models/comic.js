const mongoose = require('mongoose');
const Joi = require('joi');

const comic_schema = new mongoose.Schema({
    auteur: {type:String,  required : true}, 
    title :  {type:String, unique:true, required : true},
    image : {type:String,  required : true}
}); 

const comics_validation_schema = Joi.object({
    title : Joi.string().max(50).min(5).required(),
    auteur : Joi.string().max(30).required(),
    image : Joi.string().max(30).required()
    
})

const comics_validation_schema_update = Joi.object({
    title : Joi.string().max(50).min(5),
    auteur : Joi.string().max(30),
    image : Joi.string().max(30).required()

})

function comic_valid(body){
    return comics_validation_schema.validate(body);
}

function comic_valid_update(body){
    return comics_validation_schema.validate(body);
}

const Comic = mongoose.model('Comic',comic_schema )
module.exports = Comic
module.exports.comic_valid = comic_valid
module.exports.comic_valid_update = comic_valid_update