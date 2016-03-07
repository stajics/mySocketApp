var mongoose = require('mongoose');

mongoose.connect('mongodb://stajics:srle111@ds019488.mlab.com:19488/users');
console.log(mongoose.connection.readyState);

module.exports = mongoose;
