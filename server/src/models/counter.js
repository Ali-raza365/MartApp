import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Counter schema
const counterSchema = new Schema({
    name: {
        type: String,
        required:true,
        unique:true,
        
    },
    value:{
        type:Number,
        default:0,
        required:true,
    },
});


 const Counter = mongoose.model('Counter', counterSchema);

 export default Counter

