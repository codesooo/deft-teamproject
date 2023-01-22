import mongoose, { Schema } from 'mongoose';

const ClassNoteSchema = new Schema({
  times: Number, // 회차
  remains: Number, // 남은 수업 횟수
  usernum: Number, // 회원 이름
  classname: String, // 수업 이름
  purpose: String, // 목적
  manager: String, // 담당자
  contents: String, // 수업 내용
  comments: String, // 코멘트
  date_class: Date, // 날짜
  subject: String, // 수업 제목
  ndate_class: Date, // 다음 수업 날짜
  attachment_class: {
    type: [String],
    default: [],
  }, // 첨부파일
});

const ClassNote = mongoose.model('ClassNote', ClassNoteSchema);
export default ClassNote;
