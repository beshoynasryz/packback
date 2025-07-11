
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    totalAmount: { type: Number, required: true, min: 0 },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
    items: [orderItemSchema],
    paymentMethod: { type: String, required: true },
    trackingNumber: { type: String },
    deliveryDate: { type: Date },
}, {
    timestamps: true,
    versionKey: false
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
