import Router from 'koa-router';
import * as courseCtrl from './course.ctrl';
import * as courseCommentCtrl from './courseComment.ctrl';

const course = new Router();

course.get('/list', courseCtrl.list);
course.post('/write', courseCtrl.write);
course.get('/:id', courseCtrl.read);
course.delete('/:id', courseCtrl.remove);
course.patch('/:id', courseCtrl.update);
course.post('/comment', courseCommentCtrl.comment);

export default course;
