import React, { useState } from 'react';
import { Switch, Route, Redirect, withRouter, useHistory } from "react-router-dom";
import axios from "axios";

import './App.css';
import Login from './Login';
import SignUp from './Signup';
import MyPage from './MyPage';
import ContentsPage from './ContentsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const history = useHistory();

  const handleLoginInfo = () => {
    axios
      .get('http://34.64.248.85:8080/content')
      .then(res => {
        setIsLoggedIn(isLoggedIn)
        setUserInfo(res.data)
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

  return (
    <div>
      <Switch>
        <Route 
          exact path="/"
          render={() => {
            if (!isLoggedIn) { // isLoggedIn === false
              return <Redirect to='/login' />
            }
            return <Redirect to='/contentspage' />
          }}
        />
        <Route 
          path="/login" 
          render={() => 
            <Login handleLoginInfo={handleLoginInfo} />
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
            <ContentsPage userInfo={userInfo} LogOutHandler={LogOutHandler} />
          }
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
