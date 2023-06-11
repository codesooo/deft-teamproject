import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  name: String, // 이름
  position: String, // 직책
  phone: String, // 전화번호
  email: String, // 이메일
  username: String, // 아이디
  password: String, // 비밀번호
  job: String, // 직무
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
