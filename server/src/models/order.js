import mongoose from 'mongoose';
import Counter from './counter.js';

const Schema = mongoose.Schema;

// order schema
const OrderSchema = new Schema({
    orderId:{
        type: String,
        unique:true,
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required:true,
    },
    deliveryPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required:true,
    },
    items:[
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true,
            },
            item:{
                type: String,
                required:true,
            },
            count:{
                type: Number,
                required:true,
            },
        }
    ],
    deliveryLocation:{
        latitude:{
            type: Number,
            required:true,
        },
        longitude:{
            type: Number,
            required:true,
        },
        address:{
            type: String,
            required:true,
        },
    },
    pickupLocation:{
        latitude:{
            type: Number,
            required:true,
        },
        longitude:{
            type: Number,
            required:true,
        },
        address:{
            type: String,
            required:true,
        },
    },
    deliveryManLocation:{
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number,
        },
    },
    orderStatus:{
        type: String,
        required:true,
        enum:['available','confirmed','arriving','cancelled','delivered'],
        default:'available',
    },
    totalPrice:{
        type: Number,
        required:true,
    },
}, {timestamps: true});




const nextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await Counter.findOneAndUpdate({name: sequenceName}, {$inc:{value:1}}, {new:true});
    return sequenceDocument.value;
}

OrderSchema.pre('save', async function(next){
    if(this.isNew){
        let SequenceValue = await nextSequenceValue('orderId');
        this.orderId = `ORD-${SequenceValue?.toString().padStart(6, '0')}`;
    }
    next();
});

const Order = mongoose.model('Order', OrderSchema);

export default Order

