const mongoose = require('mongoose');
const Joi = require('joi');

const jwt = require('jsonwebtoken');
var config = require('config');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: Boolean

});

userSchema.methods.generateAuthToken = function(){

    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;

};

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().required()
    });

    return Joi.validate(user, schema);
} 

module.exports.User = User;
module.exports.validateUser = validateUser;