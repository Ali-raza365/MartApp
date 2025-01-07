import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Category schema
const categorySchema = new Schema({
    name: {
        type: String,
        required:true,
        
    },
    image:{
        type:String,
        required:true,
    },
});


 const Category = mongoose.model('Category', categorySchema);

 export default Category

