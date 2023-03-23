import Router from 'koa-router';
import * as courseCtrl from './course.ctrl';
import * as courseCommentCtrl from './courseComment.ctrl';

const course = new Router();

course.get('/list', courseCtrl.list);
course.post('/write', courseCtrl.write);
course.get('/:id', courseCtrl.read);
course.delete('/:id', courseCtrl.remove);
course.put('/:id', courseCtrl.update);
course.post('/comment', courseCommentCtrl.comment);
course.get('/comment/:courseId', courseCommentCtrl.getComments);
course.delete('/comment/:id', courseCommentCtrl.remove);

export default course;