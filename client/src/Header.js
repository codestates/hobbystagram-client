import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./Header.css";

function Header({ userInfo, token, LogOutHandler, onUpdate }) {
  console.log(userInfo); 

  return (
    <div className="header__detail">
      <div className="intro">
        <h3><span className="username">{userInfo.email}</span> 
        <span className="nim"> &nbsp;님의</span>
        <span className="hobby"> &nbsp; &nbsp;
          <button onClick={() => onUpdate()}>hobbystagram</button></span>
        <span className="is"> &nbsp;입니다.</span></h3>
      </div>
      <div className="mypage-link">
        <a>
          <Link to="/mypage">마이페이지</Link>
        </a>
      </div>
      <div className="logout-button">
      <button className="logout" onClick={() => LogOutHandler()}>
        로그아웃
      </button>
      </div>
    </div>
  );
}

export default withRouter(Header);
