import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import './Login.css';

function Login({ LoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInHandler = async () => {
      // email or password 가 입력이 되어있지 않은 상태에서 button click 시 error
      // 둘 다 입력이 되어있다면 서버에 로그인 정보 요청
      // 응답을 받아서 로그인 유저 정보를 업데이트하거나
      // 에러 메시지를 띄움
    if(setEmail("") || setPassword("")) {
        alert("회원 정보를 입력해 주세요")
    } else {
        const { data } = await axios.post('/signin', {
            params: {
                email: email,
                password: password
            }
        });

        if(data) {
            // 유저 정보를 업데이트 해 주는 함수에 데이타 값을 담아 실행
            LoginSuccess(data);
        }
        alert("회원 정보를 다시 확인해 주세요")
    }

  }

  return (
    <div className="login">
      <div className="ui form">
        <div className="field">
          <input 
            className="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text"
            placeholder="email"
          />
          <input
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />  
          <button className="loginbutton" onClick={() => logInHandler()}>로그인</button>
          <div className="signup-link">
            <a>
              <Link to='/signup'>
                <h3>회원이 아니신가요?</h3>
              </Link>
            </a>
          </div>
          <div className="social-link">
            <a>
              <Link to=''>
              <h3>/소셜 로그인</h3>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
