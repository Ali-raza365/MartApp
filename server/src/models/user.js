import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

// Basic User schema
const UserSchema = new Schema({
    name: {
        type: String,
    },
    role: {
        type: String,
        default: 'Customer',
        required: true,
        enum: ['Customer', 'Admin', "DeliveryPartner"]
    },
    isActivated: { type: Boolean, default: false },
});


const CustomerSchema = new Schema({
    ...UserSchema.obj,
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: { type: String, enum: ['Customer'], default: 'Customer' },
    liveLocation: {
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
})

const DeliveryPartnerSchema = new Schema({
    ...UserSchema.obj,
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { type: String, enum: ['DeliveryPartner'], default: 'DeliveryPartner' },
    liveLocation: {
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
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch"
    }
})

// admin Schema
const adminSchema = new Schema({
    ...UserSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { type: String, enum: ['Admin'], default: 'Admin' },
   
});

export const Customer = mongoose.model('Customer', CustomerSchema);
export const DeliveryPartner = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
export const Admin = mongoose.model('Admin', adminSchema);  // Admin model
