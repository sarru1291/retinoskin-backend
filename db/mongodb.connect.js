const mongoose=require('mongoose');
require('../config/config');

mongoose.Promise=global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports={mongoose};