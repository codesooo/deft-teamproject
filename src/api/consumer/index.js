import Router from 'koa-router';
import * as inforCtrl from './information.ctrl';

const consumer = new Router();

// 회원 정보
//consumer.get('/info', inforCtrl.list);
consumer.post('/info/create', inforCtrl.inforCreate);
//consumer.get('/info/:id', inforCtrl.read);
//consumer.delete('/info/:id', inforCtrl.remove);
//consumer.patch('/info/:id', inforCtrl.update);

export default consumer;
