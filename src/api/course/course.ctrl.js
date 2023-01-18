import Course from "../../models/course";
import Joi from 'joi';

/*
    POST /api/course/write
    {
        title: '제목',
        detail: '장애',
        content: '내용',
        effect: '효과',
        attachment: ['url1', 'url2]
    }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required()가 있으면 필수 항목
    detail: Joi.string().required(),
    content: Joi.string().required(),
    effect: Joi.string().required(),
    attachment: Joi.array().items(Joi.string()),
  });

  //검증과 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400; //Bad request
    ctx.body = result.error;
    return;
  }

  const {title, detail, content, effect, attachment} = ctx.request.body;
  const course = new Course({
    title,
    detail,
    content,
    effect,
    attachment,
  });
  try{
    await course.save();
    ctx.body = course;
  } catch(e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/course/posts
*/
export const list = async (ctx) => {
  try {
    const courses = await Course.find().exec();
    ctx.body = courses;
  } catch (e) {
    ctx.throw(500, e)
  }
};

export const read = async (ctx) => {
  const {id} = ctx.params;
  try {
    const course = await Course.findById(id).exec();
    if(!course) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = course;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const remove = async (ctx) => {
  const {id} = ctx.params;
  try {
    await Course.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공했으나 응답할 데이터 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const {id} = ctx.params;
  // write 에서 사용한 schema와 비슷하나 required()가 없다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    detail: Joi.string(),
    content: Joi.string(),
    effect: Joi.String(),
    attachment: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  try {
    const course = await Course.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 업데이트된 데이터 반환
    }).exec();
    if(!course) {
      ctx.status = 404;
      return;
    }
    ctx.body = course;
  } catch(e) {
    ctx.throw(500, e);
  }
};