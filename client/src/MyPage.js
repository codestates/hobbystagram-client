import React, { useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import axios from 'axios';
import './MyPage.css';

const width = '7.65rem';
const height = '8.75rem';
const borderStyle = "0.1px solid rgb(44, 174, 102)";
const borderRadius = "6px";

function MyPage({ userInfo, token}) {
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickname, setNickname] = useState("");
  // const [img, setImage] = useState(null);
  // 사진 drag & drop 을 위한 state
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);

  const history = useHistory();
  
  const userInfoHandler = async () => {
    const response = await axios.post('http://34.64.248.85:8080/user/info', {
      password: oldPassword,
  }, {
    // 여기에 토큰 넣기
  })
    if(response.status === 200) {
      axios.post('http://34.64.248.85:8080/user/change', {
        password: newPassword,
        nickname: nickname
      })
      .then(res => {
        if(res.status === 200) {
          alert("회원 정보가 수정되었습니다.")
          history.push('/contentspage')
        }
      })
    }
  }

  // const checkNickInfo = () => {
  //   axios.post('http://34.64.248.85:8080/user/info', {
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

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0])
  // }

  const handleImageUpload = async () => {
      const formData = new FormData();
      formData.append('file', data)
      const res = await axios.post('/signup/avatar', formData);
      console.log(res);
  }

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
  
  

    return (
    <div>
      <div className="ui form">
        <div className="field">
          {/* drag & drop 구역 */}
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

          <button className="avatarup" onClick={handleImageUpload}>프로필</button>
          <input 
          className="oldpass"
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            type="password" 
            placeholder="현재 password" 
          />
          <input 
            className="newpass"
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            type="password" 
            placeholder="변경할 password" 
          />
          <input 
            className="nickname"
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            type="text" placeholder="변경할 nickname" 
          />
          {/* <button className="checknick" onClick={() => checkNickInfo()}>확인</button> */}
          {/* <input 
            type="file" 
            style={{display: 'none'}}
            accept="image/png, image/jpeg, image/gif"
            onChange={handleImageChange} 
          /> */}
          
          
          <button className="updateuser" onClick={() => userInfoHandler()}>정보 수정</button>
          <div className="contentspage-link">
            <a>
              <Link to='/contentspage'>
                <h3>다음에 변경할래요</h3>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
