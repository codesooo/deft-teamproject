import Router from 'koa-router';
import * as inforCtrl from './information.ctrl';
import * as classnoteCtrl from './classnote.ctrl';
import * as counselnoteCtrl from './counselnote.ctrl';
import * as paymentCtrl from './payment.ctrl';

const consumer = new Router();

// 회원 정보
consumer.get('/info', inforCtrl.list);
consumer.post('/info/create', inforCtrl.inforCreate);
consumer.get('/info/:id', inforCtrl.read);
consumer.get('/info/usernum/:usernum', inforCtrl.searchusernum);

consumer.delete('/info/:id', inforCtrl.remove);
consumer.patch('/info/:id', inforCtrl.update);

consumer.post('/info/search', inforCtrl.userSearch); // 회원 검색

// 노트 - 수업일지 등록
consumer.get('/note/class', classnoteCtrl.list);
consumer.post('/note/class/create', classnoteCtrl.Create);
consumer.get('/note/class/:id', classnoteCtrl.read);
consumer.delete('/note/class/:id', classnoteCtrl.remove);
consumer.patch('/note/class/:id', classnoteCtrl.update);

consumer.get('/note/class/user/:usernum', classnoteCtrl.userClass);

// 노트 - 상담일지 등록
consumer.get('/note/counsel', counselnoteCtrl.list);
consumer.post('/note/counsel/create', counselnoteCtrl.Create);
consumer.get('/note/counsel/:id', counselnoteCtrl.read);
consumer.delete('/note/counsel/:id', counselnoteCtrl.remove);
consumer.patch('/note/counsel/:id', counselnoteCtrl.update);

consumer.get('/note/counsel/user/:usernum', counselnoteCtrl.userCounsel);

// 결제 정보
consumer.get('/payment', paymentCtrl.list);
consumer.post('/payment/create', paymentCtrl.Create);
consumer.get('/payment/:id', paymentCtrl.read);
consumer.delete('/payment/:id', paymentCtrl.remove);
consumer.patch('/payment/:id', paymentCtrl.update);

consumer.get('/payment/user/:usernum', paymentCtrl.userPayment);

export default consumer;
