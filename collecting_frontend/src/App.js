import logo from './img/logo.jpg';
import { Button } from 'antd';
import './App.less';
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

let isLogin = false

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
              {
                  function () {
                      if (isLogin) {
                          return <Button type="primary" shape="round" className="admin-login">退出登录</Button>
                      } else {
                          return <Button type="primary" shape="round" className="admin-login">管理员登录</Button>
                      }
                  }
              }
          </div>
          <div className="collecting-body">
            <div className="">
              {/*提交任务*/}
            </div>
          </div>
        </div>
      </div>
  );
}

// function Login (props) {
//     if
// }

export default App;
