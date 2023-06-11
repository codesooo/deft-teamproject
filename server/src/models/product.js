import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: String,   // 상품 이름
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
