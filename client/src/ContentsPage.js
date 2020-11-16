import React, { useEffect }  from 'react'
import SideBar from './SideBar'
import ContentsPageEntry from './ContentsPageEntry'
import Header from './Header';
import './ContentsPage.css';

function ContentsPage({ userInfo, photos, getPhotos, LogOutHandler }) {

    useEffect(() => { // componentDidMount()
        getPhotos()
    })

    return (
        <div className="contentspage">
            
            <div className="header">
                <Header userInfo={userInfo} LogOutHandler={LogOutHandler} />
            </div>
            <div className="sidebar">
                <SideBar getPhotos={getPhotos} />
                <h1>사진 찾기</h1>
            </div>
            <div className="contents" >
                {/* {photos.map(photo => {
                    return (
                        <ContentsPageEntry key={photo.id} photo={photo} />
                        // photo가 가지고 있는 속성들에는 무엇 무엇이 있는가?
                    )
                })} */}
            </div>
            {/* <div className="to-mypage">
                <button onClick={() => redirectToMyPage()}>마이 페이지</button>
                <script>
                    {redirectToMyPage = () => {
                        window.location.replace("/mypage") // full url 넣어야 한다?
                    }
                    }</script>
            </div> */}
        </div>
    )
}

export default ContentsPage;