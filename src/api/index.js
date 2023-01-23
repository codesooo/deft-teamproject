import Router from 'koa-router';
import auth from './auth';
import course from './course';
import schedule from './schedule';

const api = new Router();

api.use('/course', course.routes());
api.use('/auth', auth.routes());
api.use('/schedule', schedule.routes());

// 라우터를 내보냅니다.
export default api;
