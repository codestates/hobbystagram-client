import React from 'react'
import SideBar from './SideBar'

function ContentsPage() {
    return (
        <div>
            <div className="sidebar">
                <SideBar />
                <h1>사진 찾기</h1>
            </div>
            <div>
               {/* 이 곳에 사진 뿌려주는 바디 부분이 오면 될것 같습니다. */}
            </div>
            
        </div>
    )
}

export default ContentsPage;
