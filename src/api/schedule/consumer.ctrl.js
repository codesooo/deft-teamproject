import ScheduleConsumer from "../../models/schedule";

/*
    GET api/schedule/consumer/:usernum
*/
// 해당 회원의 모든 일정 불러오기
export const list = async (ctx) => {
    const {usernum} = ctx.params;
  
    try {
  
      const schedules = await ScheduleConsumer.find({usernum : usernum}).exec();
      if(!schedules) {
        ctx.status = 404; // Not Found
        return;
      }
      ctx.body = schedules;
    } catch (e) {
      ctx.throw(500, e);
    }
  };