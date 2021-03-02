const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema
({
    name : String,
    email : String, 
    pass : String, 
    role : Number,
    createdon : Date

    
}, { strict: true });


//mongoose.connect('mongodb://localhost:27017/wallet', {useNewUrlParser: true, useUnifiedTopology: true});

//const User = mongoose.model('user', { name: String, email : String, pass : String, verified : Boolean });

module.exports = mongoose.model('users', userSchema);