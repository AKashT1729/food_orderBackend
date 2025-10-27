import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
});

export const Customer = mongoose.model('Customer', customerSchema);
