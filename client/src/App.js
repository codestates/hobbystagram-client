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
  const [token, setToken] = useState(null);

  const history = useHistory();
  
  const authedAxios = axios.create(
    { headers: { 
      Authorization: `${token}`
    }}
  );
  
  const LoginSuccess = (user, token) => {
    console.log('token', token);
    setIsLoggedIn(true);
    setUserInfo(user);
    setToken(token);
    history.push('/contentspage')
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

  const redirectToMyPage = () => {
    window.location.assign("/mypage")
  }

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
