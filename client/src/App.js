import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import './App.css';
import Login from './Login';
import SignUp from './Signup';
import MyPage from './MyPage';
import ContentsPage from './ContentsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [photos, setPhotos] = useState(null);
  // const [photo, setPhoto] = useState(null);

  const history = useHistory();

  const LoginSuccess = () => {
    axios
      .get('http://34.64.248.85:8080/signin') // 어느 엔드 포인트에서 post된 유저 정보(입력 받은 email, password 값)를 받아와야 하는가?
      .then(res => {
        setIsLoggedIn(isLoggedIn)
        setUserInfo(res.data) // 입력 받은 email, password 값으로 유저 정보 업데이트 // data로 받아오는게 맞는가?
        history.push('/contentspage')
      })
  }
  
  const LogOutHandler = () => {
    axios
      .post('http://34.64.248.85:8080/logout')
      .then(() => {
        setIsLoggedIn(!isLoggedIn)
        history.push('/')
      })
  }

  // MyPage와 ContentsPage에서 사용할 것
  // if (isLoggedIn) {
  //   return (
  //       <div> 
  //           <div className="logout">
  //               <label>logout</label>
  //               <button onClick={logOutHandler}>Log Out</button>
  //           </div>
  //       </div>
  //   )
  // }

  const getPhotos = () => {
    // axios
    //   .get('http://34.64.248.85:8080/photo/?_limit=12', { // 엔드 포인트 확인 // 한번에 12개의 사진을 받아오고 싶다(최신순)
    //     responseType: 'arraybuffer'
    //   })
    //   .then(res => {
    //     Buffer.from(res.data, 'binary').toString('base64') // 사진별로 분리해주지 않아도 되는가?
    //   })
    //   .then((photos) => {
    //     setPhotos(photos)
    //     history.push('/contentspage')
    //   })
  }

  // const handlePhotoClick = (e) => {
  //   setPhoto(e.target.value) // ?
  // }

  return (
    <div>
        <Route 
          exact path="/"
          render={() => {
            if (!isLoggedIn) {
              return <Redirect to='/login' />
            }
            return <Redirect to='/contentspage' />
          }}
        />
        <Switch>
          <Route 
            path="/login" 
            render={() => 
              <Login LoginSuccess={LoginSuccess} />
            }
          />
          <Route 
            path="/signup" 
            render={() => 
              <SignUp />
            }
          />
          <Route 
            path="/mypage" 
            render={() =>
              <MyPage userInfo={userInfo} LogOutHandler={LogOutHandler} />
            }
          />
          <Route
            path="/contentspage"
            render={() =>
              <ContentsPage userInfo={userInfo} photos={photos} getPhotos={getPhotos} LogOutHandler={LogOutHandler} />
            }
          />
        </Switch>
    </div>
  );
}

export default App;
