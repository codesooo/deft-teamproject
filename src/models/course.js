import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
  title: String,
  detail: String,
  content: String,
  effect: String,
  attachment: {
    type: [String],
    default: [],
  },
},
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', CourseSchema);
export default Course;
