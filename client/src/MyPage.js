import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function MyPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [img, setImage] = useState(null);
  
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleImageUpload = async () => {
      const formData = new FormData();
      formData.append('file', img)
      const res = await axios.post('/signup/avatar', formData);
      console.log(res);
  }

    return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>My Page</label>
          <br />
          <input 
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            type="password" 
            placeholder="current password" />
          <br />
          <input 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            type="password" 
            placeholder="new password" />
          <br />
          <input 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            type="text" placeholder="nickname" />
          <button onClick={() => checkNickInfo()}>확인</button>
          <input 
            type="file" 
            style={{display: 'none'}}
            accept="image/png, image/jpeg, image/gif"
            onChange={handleImageChange} />
          <button onClick={handleImageUpload}>프로필 사진 등록</button>
          <br />
          <button onClick={() => userInfoHandler()}>회원 정보 등록</button>
          
        </div>
      </div>
    </div>
  );
}

export default MyPage;
