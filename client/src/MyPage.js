import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './MyPage.css';

const width = 100;
const height = 100;
const borderStyle = "2px dotted #000";

function MyPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickname, setNickname] = useState("");
  // const [img, setImage] = useState(null);
  // 사진 drag & drop 을 위한 state
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  
//   아래 함수 수정해야 함
  const userInfoHandler = () => {
    axios.post('/account/change', {
        oldPassword: oldPassword,
        nickname: nickname
    })
    .then(res => {
        if(res.status === 200) {
            alert("회원 정보가 수정되었습니다.")
        }
    })
  }

  const checkNickInfo = () => {
    axios.post('/account/change', {
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
    border: borderStyle
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
          
          <input 
          className="oldpass"
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            type="password" 
            placeholder="현재 password" />
          
          <input 
            className="newpass"
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            type="password" 
            placeholder="변경할 password" />
          
          <input 
            className="nickname"
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            type="text" placeholder="변경할 nickname" />
          <button className="checknick" onClick={() => checkNickInfo()}>확인</button>
          {/* <input 
            type="file" 
            style={{display: 'none'}}
            accept="image/png, image/jpeg, image/gif"
            onChange={handleImageChange} /> */}

            {/* drag & drop 구역 */}
          <div className="image">
            {err && <p>{err}</p>}
              <div
                // style={dropAreaStyle}
                onDrop={e => onDrop(e)}
                onDragOver={e => onDragOver(e)}
              >
              {data && <img style={dropAreaImageStyle} src={data} />}
               {/* +업로드할 사진을 drag & drop 으로 올려 주세요 */}
            </div>
            <div className="button-wrapper">
            {data && <button onClick={() => setData(false)}>Remove</button>}
            </div>
          </div>

          <button className="avatarup" onClick={handleImageUpload}>프로필 사진 변경</button>
          
          <button className="updateuser" onClick={() => userInfoHandler()}>정보 수정</button>
          
        </div>
      </div>
    </div>
  );
}

export default MyPage;
