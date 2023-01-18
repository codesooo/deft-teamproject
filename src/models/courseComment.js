import mongoose, { Schema } from 'mongoose';

const CourseCommentSchema = new Schema({
  title: String,
  userId: String,
  courseId: String,
},
    {
        timestamps: true,
    }
);

const CourseComment = mongoose.model('CourseComment', CourseCommentSchema);
export default CourseComment;
