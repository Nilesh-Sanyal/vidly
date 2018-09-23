const express = require('express');

const router = express.Router();

const {Customer, validateCustomer} = require('../models/customer');

router.get('/', (req, res) =>{

    Customer.find({})
            .then((customers) =>{
                res.status(200).send({customers: customers});
            })
            .catch((err) =>{
                res.status(500).send('Error getting customers');
            });

});

router.get('/:id', (req, res) =>{

    const customerID = req.params.id;

    Customer.findById(customerID)
        .then((customer) =>{
            res.status(200).send({customer: customer});
        })
        .catch((err) =>{
            res.status(404).send('Customer not found');
        });

});

router.post('/', (req, res) =>{

    const { error } = validateCustomer(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    else{  
        let customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });

        customer.save()
            .then((response) =>{
                res.status(200).send({customer: response});
            })
            .catch((err) =>{
                res.status(500).send('Error saving customer');
            });
    }

});

router.put('/:id', (req, res) =>{

    const customerID = req.params.id;

    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    else{
        Customer.findByIdAndUpdate(customerID,{
            name: req.body.name,isGold: req.body.isGold,phone: req.body.phone},{
            new: true
        })
        .then((customer) =>{
            res.status(201).send({customer: customer}); 
        })
        .catch((err) =>{
            res.status(500).send('Error updating customer');
        });
    }

});

router.delete('/:id', (req, res) =>{
    const customerID = req.params.id;

    Customer.findByIdAndRemove(customerID)
        .then((customer) =>{
            res.status(200).send({customer: customer});
        })
        .catch((err) =>{
            res.status(500).send('Error deleting customer');
        });

});

module.exports = router;