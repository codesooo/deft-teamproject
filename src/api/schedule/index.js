import Router from 'koa-router';
import * as scheduleAdminCtrl from './admin.ctrl';

const schedule = new Router();

schedule.post('/admin', scheduleAdminCtrl.scheduleAdmin);

export default schedule;