import CourseComment from "../../models/courseComment";
import Joi from 'joi';

/*
    POST /api/course/comment
    {
        content: '',
        userId: '',
        courseId: '',
    }
*/
export const comment = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    content: Joi.string().required(), // required()가 있으면 필수 항목
    userId: Joi.string().required(),
    courseId: Joi.string().required(),
  });

  //검증과 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400; //Bad request
    ctx.body = result.error;
    return;
  }

  const {content, userId, courseId} = ctx.request.body;
  const courseComment = new CourseComment({
    content,
    userId,
    courseId,
  });
  try{
    await courseComment.save();
    ctx.body = courseComment;
  } catch(e) {
    ctx.throw(500, e);
  }
};