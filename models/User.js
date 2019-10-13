const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports= model('User', userSchema)