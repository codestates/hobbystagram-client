import React, { useState } from "react";
import axios from 'axios';
import { Link, withRouter, useHistory } from "react-router-dom";
import './Signup.css';


const width = 'grid-column: 1 / 3';
const height = 'grid-row: 1 / 6';
const borderStyle = "1px solid rgb(44, 174, 102)";
const borderRadius = "6px";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  // 사진 drag & drop 을 위한 state
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);

  const history = useHistory();

  const signUpHandler = () => {
    axios.post('http://34.64.248.85:8080/user/signup', {
        email: email,
        password: password,
        nickname: nickname
    })
    .then(res => {
        console.log(res);
        console.log(res.request);
        if(res.status === 200) {
          alert("회원 가입이 완료되었습니다.")
          history.push('/');
        }else if(res.status === 409) {
          alert("가입 정보를 다시 확인해 주세요")
        }
    })
  }

  // const checkEmailInfo = () => {
  //   axios.post('http://34.64.248.85:8080/user/signup', {
  //       email: email
  //   })
  //   .then(res => {
  //       if(res.status === 409) {
  //           alert("이메일 계정을 다시 확인해 주세요")
  //       } else {
  //         console.log(res);
  //       }
  //   })
  //   .catch((error) => {
  //       alert("이메일 계정을 다시 확인해 주세요")
  //   })
  // }

  // const checkNickInfo = () => {
  //   axios.post('http://34.64.248.85:8080/user/signup', {
  //       nickname: nickname
  //   })
  //   .then(res => {
  //       if(res.status === 200) {
  //           alert("사용 가능한 닉네임입니다.")
  //       }
  //   })
  //   .catch((error) => {
  //       alert("이미 사용중인 닉네임입니다.")
  //   })
  // }

  // drag & drop 을 구현하기 위한 함수
  const dropAreaImageStyle = {
    width,
    height
  };
  
  const dropAreaStyle = {
    ...dropAreaImageStyle,
    borderStyle: borderStyle,
    borderRadius: borderRadius
  }
  const onDrop = e => {
    e.preventDefault();
    const {
      dataTransfer: { files }
    } = e;
    console.log("Files: ", files);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];
    setData(false);
    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }
    if (size / 1024 / 1024 > 2) {
      setErr("File size exceeded the limit of 2MB");
      return false;
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = loadEvt => {
      setData(loadEvt.target.result);
    };
  };
  const onDragStart = e => {
    e.preventDefault();
  };
  const onDragOver = e => {
    e.preventDefault();
  };
  

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', data)
    const res = await axios.post('http://34.64.248.85:8080/user/signup', formData);
    console.log(res);
}

  return (
    <div>
      <div className="ui form">
        <div className="field">
        <div className="image">
        {err && <p>{err}</p>}
        <div 
        style={dropAreaStyle}
        onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)}>
          {data && <img style={dropAreaImageStyle} src={data} />}
          
        </div>
        {/* <div className="button-wrapper">{ */}
        {/* data &&  */}
        
        {/* }</div> */}
      </div>
      <button className="remove-button" onClick={() => setData(false)}>Remove</button>
          <input 
            className="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" 
            placeholder="email"
          />
          {/* <button className="check-email" onClick={() => checkEmailInfo()}>확인</button>   */}
        
          <input 
            className="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="password" 
          />
         
          <input 
            className="nickname"
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            type="text" 
            placeholder="nickname" 
          />
          {/* <button className="check-nick" onClick={() => checkNickInfo()}>확인</button>  */}
          {/* <input type="file" onChange={handleImageChange} /> */}
          {/* drag & drop 구역 */}
          

          
          <button className="avatarup" onClick={() => handleImageUpload}>프로필</button>
          
          <button className="signup" onClick={() => signUpHandler()}>회원 가입</button>
          <div className="login-link">
            <a>
              <Link to="login">
                <h3>계정이 이미 있으신가요?</h3>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
