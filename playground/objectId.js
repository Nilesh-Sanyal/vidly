const mongoose = require('mongoose');

const isValid = mongoose.Types.ObjectId.isValid('1234');

console.log(isValid);
