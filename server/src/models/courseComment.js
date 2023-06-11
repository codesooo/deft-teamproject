import mongoose, { Schema } from 'mongoose';

const CourseCommentSchema = new Schema({
  content: String,
  userId: String,
  courseId: String,
  date: String,
},
    {
        timestamps: true,
    }
);

const CourseComment = mongoose.model('CourseComment', CourseCommentSchema);
export default CourseComment;