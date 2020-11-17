import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import './App.css';
import Login from './Login';
import SignUp from './Signup';
import MyPage from './MyPage';
import ContentsPage from './ContentsPage';
// import examplePhotos from './photos.json';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  // const [photos, setPhotos] = useState(null);
  // const [photo, setPhoto] = useState(null);

  const history = useHistory();
  
  const authedAxios = axios.create({ headers: { Authorization: `${token}`}});
  const LoginSuccess = (user, token) => {
    console.log('token', token);
    setIsLoggedIn(true);
    setUserInfo(user);
    setToken(token);
    history.push('/contentspage')
    // authedAxios
    //   .get('http://34.64.248.85:8080/user/signin') // 어느 엔드 포인트에서 post된 유저 정보(입력 받은 email, password 값)를 받아와야 하는가?
    //   .then(res => {
    //     setIsLoggedIn(true)
    //     setUserInfo(res.data) // 입력 받은 email, password 값으로 유저 정보 업데이트 // data로 받아오는게 맞는가?
    //     console.log('res.data', res.data);
    //     history.push('/contentspage')
    //   })
  }
  
  const LogOutHandler = () => {
    axios
      .post('http://34.64.248.85:8080/user/logout')
      .then(() => {
        setIsLoggedIn(!isLoggedIn);
        setToken(null);
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
       
  // const getPhotos = () => {
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

    // axios
    //   .get('https://www.dropbox.com/s/k2hmky63p2iqqhd/test_image.jpg?dl=0', { // 임시 확인용 // 포스트맨에서 작동 // 콘솔에서는 CORS 에러
    //       responseType: 'arraybuffer'
    //   })
    //   .then(res => {
    //     Buffer.from(res.data, 'binary').toString('base64') // 사진별로 분리해주지 않아도 되는가?
    //   })
    //   .then((photos) => {
    //     setPhotos(photos)
    //     history.push('/contentspage')
    //   })

  //   axios
  //     .get(examplePhotos)
  //     .then(res => res.json())
  //     .then(data => {
  //       setPhotos(data)
  //       console.log(data)
  //     })
  // }

  const redirectToMyPage = () => {
    window.location.assign("/mypage") // 뒤로 가기 가능, replace()는 불가능
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
                <MyPage userInfo={userInfo} token={token}/>
            }
          />
          <Route
            path="/contentspage"
            render={() =>
                <ContentsPage userInfo={userInfo} token={token} LogOutHandler={LogOutHandler} redirectToMyPage={redirectToMyPage} />

            }
          />
        </Switch>
    </div>
  );
}

export default App;
