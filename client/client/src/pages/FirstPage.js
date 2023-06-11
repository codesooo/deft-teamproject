import './FirstPage.css';
import { Col, Row, Typography } from 'antd';
import {useNavigate} from 'react-router-dom'

function FirstPage() {
  const navigate = useNavigate();

  const move = () => {
    const auth = localStorage.getItem('auth')
    console.log("이걸..",auth);
    if(auth == '"coach"' ){
      navigate('/')
    }
    if(auth == '"admin"' ){
      navigate('/')
    }
    if(auth == '"user"' ){
      alert("관리자 및 코치만 접근 가능");
    }
  }

  const customermove = () => {
   
    navigate('/fc/login');
  }
  return (
    <div className="App">
      <br/>
      <h2>Adapfit</h2>
        <Row>
          <Col span={12}>
          <div className="btn1" onClick={move}>
            <br/><br/><br/><br/>
            <h1 className="text">관리자/코치용</h1>
          </div>
          </Col>
          <Col span={12}>
          <div className="btn2" onClick={customermove}> 
            <br/><br/><br/><br/>  
            <h1 className="text">회원용</h1>
            </div>
          </Col>
        </Row>
      
    </div>
   
  );
}

export default FirstPage;