import Joi from 'joi';
import User from '../../models/user';
import Admin from '../../models/member.admin';

// 관리자 계정
/*
  POST /api/member/admin/create
  {
    name: "김광운",
    phone: "01012341234",
    username: "KWDeft",
    password: "kwangwoon",
    email: "kwdeft@kw.ac.kr", 
    position: "직책",
    job: "직무"
  }
*/
export const adminCreate = async (ctx) => {
  // Request Body 검증하기
  // 필수: 이름, 전화번호 / 선택: 직책, 이메일, 직무, 아이디, 비밀번호
  const schema = Joi.object().keys({
    name: Joi.string().required(), // 이름(필수)
    position: Joi.string(), // 직책
    phone: Joi.string().required(), // 전화번호(필수)
    email: Joi.string(), // 이메일
    username: Joi.string().alphanum().min(3).max(20), // 아이디
    password: Joi.string(), // 비밀번호
    job: Joi.string(), // 직무
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, position, phone, email, username, password, job } =
    ctx.request.body;
  try {
    // username 이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const post = new Admin({
      name: name,
      position: position,
      phone: phone,
      email: email,
      username: username,
      password: password,
      job: job,
    });

    await post.save(); // 데이터베이스에 저장

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/member/admin
*/
export const list = async (ctx) => {
  try {
    const posts = await Admin.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    GET /api/member/admin/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Admin.findById(id).exec();
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
    DELETE /api/member/admin/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Admin.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
    PATCH /api/member/admin/:id
    {
        title: '수정',
        body: '수정 내용',
        tags: ['수정', '태그']
    }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Admin.findByIdAndUpdate(id, ctx.request.body, {
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
    Post /api/member/admin/search
    {
      name: "최관리"
    }
*/
export const search = async (ctx) => {
  const { name } = ctx.request.body;

  try {
    const post = await Admin.find({ name: { $regex: name } }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
