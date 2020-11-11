import React, { useState } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import './App.css';
import Login from './Login';
import LogOut from './LogOut';
import Signup from './Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 로그아웃에 각각 서버에서 받아오는 것, 상태 변경 후 리다이렉트 하는 것까지 넣어야 함

  return (
    <div>
      <Switch>
        <Route 
          exact path="/"
          render={() => { // 이렇게 쓰는 것이 맞는지?
            if (!isLoggedIn) { // isLoggedIn === false
              return <Redirect to='/login' />
            }
            return <Redirect to='/contentspage' />
          }}
          />
        <Route path="/login" component={Login} />
        {/* <Route path="/logOut" component={LogOut} /> */}
      </Switch>
    </div>
  );
}

export default withRouter(App);
