import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import './Login_original.css';

function Login({ LoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInHandler = async () => {

    if(email === "" || password === "") {
        alert("회원 정보를 입력해 주세요")
    } else {
        const res = await axios.post('http://34.64.248.85:8080/user/signin', { 
            email: email,
            password: password
        });
        console.log('res', res);
        console.log('res.data', res.config.data);
        console.log('res.data', res.data.token);

        if(res.status === 200) {
            const user = JSON.parse(res.config.data); 
            const token = res.data.token; 
            LoginSuccess(user, token);
        } else {
          alert("회원 정보를 다시 확인해 주세요")
      }
    }
  }

  return (
    <div> 
      <div className="login">
        <div className="area">
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
          <div className="signup__link">
            <a>
              <Link to='/signup'>
                <h3>회원이 아니신가요?</h3>
              </Link>
            </a>
          </div>
          <div className="social__link">
            <a>
              <Link to=''>
                <h3>소셜 로그인</h3>
              </Link>
            </a>
          </div>
        </div>
      </div> 
    </div> 
  );
}

export default withRouter(Login);
