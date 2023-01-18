import mongoose, { Schema } from 'mongoose';

const ScheduleAdminSchema = new Schema({
  userNum: String,
  date: String,
  startHour: String,
  startMinute: String,
  endHour: String,
  endMinute: String,
  memo: String,
});

const ScheduleAdmin = mongoose.model('ScheduleAdmin', ScheduleAdminSchema);
export default ScheduleAdmin;
