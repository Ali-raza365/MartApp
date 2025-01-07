import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Branch schema
const branchSchema = new Schema({
    name: {
        type: String,
    },
    Location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    address: {
        type: String,
    },
    DeliveryPartner:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner'}
    ]
});


 const Branch = mongoose.model('Branch', branchSchema);

 export default Branch

