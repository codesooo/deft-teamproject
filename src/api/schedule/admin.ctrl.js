import ScheduleAdmin from "../../models/scheduleAdmin";
import Joi from 'joi';

/*
    POST /api/schedule/admin
    {
        userNum: '회원번호',
        date: '장애',
        startHour: '시작시간',
        startMinute: '시작분',
        endHour: '종료시간',
        endMinute: '종료분',
        memo: '메모',
    }
*/
export const scheduleAdmin = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    userNum: Joi.string().required(), // required()가 있으면 필수 항목
    date: Joi.string().required(),
    startHour: Joi.string().required(),
    startMinute: Joi.string().required(),
    endHour: Joi.string().required(),
    endMinute: Joi.string().required(),
    memo: Joi.string().required(),
  });

  //검증과 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400; //Bad request
    ctx.body = result.error;
    return;
  }

  const {userNum, date, startHour, startMinute, endHour, endMinute, memo} = ctx.request.body;
  const scheduleAdmin = new ScheduleAdmin({
    userNum, 
    date, 
    startHour, 
    startMinute, 
    endHour, 
    endMinute, 
    memo,
  });
  try{
    await scheduleAdmin.save();
    ctx.body = scheduleAdmin;
  } catch(e) {
    ctx.throw(500, e);
  }
};