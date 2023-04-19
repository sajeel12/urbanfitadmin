const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true
    },
    addresses: [
        {
            tag: {type: String, required: true},
            address_title: { type: String, required: true },
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            address: { type: String, required: true },
            apt_suite: { type: String },
            city: { type: String, required: true },
            country: { type: String, required: true },
            phone_prefix: { type: String, required: true },
            phone_number: { type: String, required: true },
        }
    ]
}, { timestamps: true })

module.exports = mongoose.models.Addresses || mongoose.model("Addresses", AddressSchema)