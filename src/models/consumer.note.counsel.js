import mongoose, { Schema } from 'mongoose';

const CounselNoteSchema = new Schema({
  usernum: Number, // 회원 번호
  purpose: String, // 목적
  manager: String, // 담당자
  method: String, // 상담 방법
  reception: String, // 접수 상태
  detail: String, // 상담 내용
  date_counsel: Date, // 날짜
  ndate_counsel: Date, // 다음 수업 날짜
  attachment_counsel: {
    type: [String],
    default: [],
  }, // 첨부파일
});

const CounselNote = mongoose.model('CounselNote', CounselNoteSchema);
export default CounselNote;
