const mongoose = require('mongoose');
const Joi = require('joi');


const customerModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Customer = mongoose.model('customer', customerModelSchema);

function validateCustomer(genre){
    const customerSchema = Joi.object().keys({
        name: Joi.string().min(5).max(40).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required(),
        //phone: Joi.number().required()
    });

    return Joi.validate(genre, customerSchema);

} 

module.exports.customerModelSchema = customerModelSchema;
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;