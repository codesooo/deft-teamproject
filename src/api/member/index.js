import Router from 'koa-router';
import * as adminCtrl from './admin.ctrl';
import * as coachCtrl from './coach.ctrl';

const member = new Router();

// 관리자
member.get('/admin', adminCtrl.list);
member.post('/admin/create', adminCtrl.adminCreate);
member.get('/admin/:id', adminCtrl.read);
member.delete('/admin/:id', adminCtrl.remove);
member.patch('/admin/:id', adminCtrl.update);

// 코치
member.get('/coach', coachCtrl.list);
member.post('/coach/create', coachCtrl.coachCreate);
member.get('/coach/:id', coachCtrl.read);
member.delete('/coach/:id', coachCtrl.remove);
member.patch('/coach/:id', coachCtrl.update);
member.post('coach/searchuser', coachCtrl.searchUsers);

export default member;
