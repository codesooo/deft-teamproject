import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import course from './course';
import schedule from './schedule';
import consumer from './consumer';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/course', course.routes());
api.use('/auth', auth.routes());
api.use('/schedule', schedule.routes());
api.use('/consumer', consumer.routes());

// 라우터를 내보냅니다.
export default api;
