import logo from './img/logo.jpg';
import { Button } from 'antd';
import './App.css';

function App() {
  return (
      <div className="App" id="App">
        <div className="background" />
        <div className="container">
          <div className="header">
            <div className="logo">
              <span className="logo-text">Collecting</span>
                <img src={logo} className="logo-image" alt="logo" />
            </div>
            <Button type="primary" className="admin-login">管理员登录</Button>
          </div>
          <div className="collecting-body">
            <div className="">
              提交任务

            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
