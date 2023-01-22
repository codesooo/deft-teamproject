import Joi from 'joi';
import User from '../../models/user';
import Coach from '../../models/member.coach';

/*
  POST /api/member/coach/create
  {
    name: "김광운",
    phone: "01012341234",
    username: "KWDeft",
    password: "kwangwoon",
    email: "kwdeft@kw.ac.kr",
    job: "직무",
    record: "이력",
    coachnum: 123
  }
*/
export const coachCreate = async (ctx) => {
  // Request Body 검증하기
  // 필수: 이름, 전화번호 / 선택: 이메일, 직무, 이력, 아이디, 비밀번호
  const schema = Joi.object().keys({
    name: Joi.string().required(), // 이름(필수)
    phone: Joi.string().required(), // 전화번호(필수)
    email: Joi.string(), // 이메일
    username: Joi.string().alphanum().min(3).max(20), // 아이디
    password: Joi.string(), // 비밀번호
    job: Joi.string(), // 직무
    record: Joi.string(), // 이력
    coachnum: Joi.number().required(), // 코치 번호(필수)
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, phone, email, username, password, job, record, coachnum } =
    ctx.request.body;
  try {
    // username 이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const post = new Coach({
      name: name,
      phone: phone,
      email: email,
      username: username,
      password: password,
      job: job,
      record: record,
      coachnum: coachnum,
    });

    await post.save(); // 데이터베이스에 저장

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/member/coach
*/
export const list = async (ctx) => {
  try {
    const posts = await Coach.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/member/coach/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Coach.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    DELETE /api/member/coach/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Coach.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    PATCH /api/member/coach/:id
    {
        title: '수정',
        body: '수정 내용',
        tags: ['수정', '태그']
    }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Coach.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/member/coach/responsible/:manager(코치번호)
    (예. /api/member/coach/responsible/1001)
*/
export const responsible = async (ctx) => {
  const { manager } = ctx.params;

  try {
    const post = await Info.find({ manager: manager }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    Post /api/member/coach/search
    {
      name: "이코치"
    }
*/
export const search = async (ctx) => {
  const { name } = ctx.request.body;

  try {
    const post = await Coach.find({ name: { $regex: name } }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    Post /api/member/search
    {
      name: "이코치"
    }
*/
export const searchMember = async (ctx) => {
  const { name } = ctx.request.body;

  try {
    const post =
      (await Coach.find({ name: { $regex: name } }).exec()) +
      ',' +
      (await Admin.find({ name: { $regex: name } }).exec());

    if (post == ',') {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

