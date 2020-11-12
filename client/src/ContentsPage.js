import React from 'react'
import MainImages from './MainImages'
import SideBar from './SideBar'

function ContentsPage() {
    return (
        <div>
            <div className="sidebar">
                <SideBar />
                <h1>사진 찾기</h1>
            </div>
            <div className="main-images">
                <MainImages />
            </div>
            
        </div>
    )
}

export default ContentsPage;
