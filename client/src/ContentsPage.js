import React, { useEffect }  from 'react'
import SideBar from './SideBar'
import ContentsPageEntry from './ContentsPageEntry'

function ContentsPage({ photos, getPhotos, LogOutHandler }) {

    useEffect(() => { // componentDidMount()
        getPhotos()
    })

    return (
        <div>
            <div className="sidebar">
                <SideBar />
                <h1>사진 찾기</h1>
            </div>
            <div className="contents" >
                {photos.map(photo => {
                    return (
                        <ContentsPageEntry key={photo.id} photo={photo} />
                        // photo가 가지고 있는 속성들에는 무엇 무엇이 있는가?
                    )
                })}
            </div>
            <div className="to-mypage">
                <button onclick="redirectToMyPage()">마이 페이지</button>
                <script>
                    function redirectToMyPage() {
                        window.location.replace("/mypage") // full url 넣어야 한다?
                    }
                </script>
            </div>
            <div className="to-logout">
                <button onClick={() => LogOutHandler()}>로그 아웃</button>
            </div>
        </div>
    )
}

export default ContentsPage;