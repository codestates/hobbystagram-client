import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./Header.css";

function Header({ userInfo, LogOutHandler }) {
  return (
    <div className="header">
      {/* {userInfo.nickname}  */}
      <div className="intro">
        <h3>nickname 님의 hobbystagram 입니다.</h3>
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
