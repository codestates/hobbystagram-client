import React, { useState } from "react";
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const signUpHandler = () => {
    axios.post('/signup', {
        email: email,
        password: password,
        nickname: nickname
    })
    // .then(res => {
    //     history.push('/')
    // })
  }

  const checkEmailInfo = () => {
    axios.post('/signup', {
        email: email
    })
    .then(res => {
        if(res.status === 200) {
            alert("사용 가능한 계정입니다.")
        }
    })
    .catch((error) => {
        alert("이메일 계정을 다시 확인해 주세요")
    })
  }

  const checkNickInfo = () => {
    axios.post('/signup', {
        nickname: nickname
    })
    .then(res => {
        if(res.status === 200) {
            alert("사용 가능한 닉네임입니다.")
        }
    })
    .catch((error) => {
        alert("이미 사용중인 닉네임입니다.")
    })
  }

  const handleImageChange = () => {

  }

  const handleImageUpload = () => {
      
  }

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Sign Up</label>
          <br />
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" 
            placeholder="email"
          />
          <button onClick={() => checkEmailInfo()}>확인</button>  
          <br />  
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="password" 
          />
          <br />
          <input 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            type="text" 
            placeholder="nickname" 
          />
          <button onClick={() => checkNickInfo()}>확인</button> 
          <input type="file" onChange={handleImageChange} />
          <button onClick={() => handleImageUpload}>프로필 사진 등록</button>
          <br />
          <button onClick={() => signUpHandler()}>Sign Up</button>
          <div>
            <h3>계정이 이미 있으신가요?</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
