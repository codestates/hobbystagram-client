import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import './Header.css';

function Header({ userInfo, LogOutHandler }) {
    return (
        <div className="header">
                {/* {userInfo.nickname}  */}
            <h3>nickname 님의 hobbystagram 입니다.</h3>
            <a className="mypage-link">
            <Link to="/mypage">마이페이지</Link>
            </a>
            <button onClick={() => LogOutHandler()}>로그아웃</button>
            
        </div>
    )
}

export default withRouter(Header);
