import mongoose, { Schema } from 'mongoose';

const ProductDetailSchema = new Schema({
  count: String,
  price: String,
  productId: String,
});

const ProductDetail = mongoose.model('ProductDetail', ProductDetailSchema);
export default ProductDetail;