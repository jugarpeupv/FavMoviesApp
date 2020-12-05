const mongoose = require('mongoose')


const MovieSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        trim: true,
                }, 
    rating: {
        type: Number,
        required: true,            
                 },                 
    description: {
        type: String,
        required: false,            
                 },                 
    createdAt: {
        type: Date,
        default: Date.now,                       
                 },                  
     });


module.exports = mongoose.model('Movie', MovieSchema)