import React, { useState, useEffect }  from 'react';
// import { withRouter } from "react-router-dom";
// import axios from "axios";
// const fetch = require('node-fetch');
import Header from './Header';
import SideBar from './SideBar';
import ContentsPageEntry from './ContentsPageEntry';
import './ContentsPage.css';
import './SideBar.css';
// import examplePhotos from './photos.json';

function ContentsPage({ LogOutHandler, redirectToMyPage }) {
    const examplePhotos = [ // http는 크롬에서 안 뜸
        {
            id : 1, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/651673/thumbnail/thumbnail_IMAG04_6516d7ed-418b-4ba9-81d7-37b76e186d17.jpg"
        } , 
        {
            id : 2, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/728015/thumbnail/thumbnail_IMAG04_417f59a7-469f-4a4f-a4da-65818377f134.jpg"
        } , 
        {
            id : 3, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/616239/thumbnail/title_thumbnail_20161031214436_t218x120.jpg"
        } , 
        {
            id : 4, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/749456/thumbnail/thumbnail_IMAG04_ddb47faf-6f26-4fbe-908b-b7513e168572.jpg"
        } , 
        {
            id : 5, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/703839/thumbnail/thumbnail_IMAG04_453849b9-edc0-4e40-a0ef-8d72310ebd87.jpg"
        },
        {
            id : 6, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/748105/thumbnail/thumbnail_IMAG04_2b479f04-a16b-4fa2-9a05-bc60cd84022c.jpg"
        },
        {
            id : 7, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/732955/thumbnail/thumbnail_IMAG04_48fcd69c-3091-4bca-bd5d-7e8605d22cfc.jpg"
        },
        {
            id : 8, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/743721/thumbnail/thumbnail_IMAG04_8416b628-4514-4c67-a3ad-cda5e957bd78.jpg"
        },
        {
            id : 9, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/557676/thumbnail/thumbnail_IMAG04_a6af4177-6df2-468e-a67c-6cc6714a04a4.jpg"
        },
        {
            id : 10, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/755674/thumbnail/thumbnail_IMAG04_034bbdfe-527b-478d-a341-02236010f5f9.jpg"
        },
        {
            id : 11, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/746834/thumbnail/thumbnail_IMAG04_9574b0b3-28bc-40fe-8462-7a13df659691.jpg"
        },
        {
            id : 12, 
            path : "https://shared-comic.pstatic.net/thumb/webtoon/728750/thumbnail/thumbnail_IMAG04_0941790b-1373-49af-adf2-76139643577c.jpg"
        }
    ]

    const [photos, setPhotos] = useState([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // function axiosPhotos() {
    //     axios
    //       .get(examplePhotos)
    //       .then(() => {
    //           setPhotos([...photos])
    //       })
    //       .catch(err => {
    //           console.log(err)
    //       })
    // }

    useEffect(() => { // componentDidMount()와 비슷한 역할
        // getPhotos()
        const axiosPhotos = () => {
            // const res = await axios.get(examplePhotos); // url // axios 변수 설정으로 url을 넣을 수도 있다
            setPhotos(examplePhotos); // 임시
            // console.log(res) // console.log("포토 확인", res)
        }
        axiosPhotos()
    }, []) // [photos] // photos에 변동이 생기면 useEffect 작동 // danger!!!!([photo]로 해도 계속 받아오는 이유는?) // 또한 함수를 안에서 정의해 주거나 useCallback을 사용해 주어야 함
    
    // console.log(examplePhotos) // 배열(10개)
    // console.log(photos) // 왜 photos가 배열이 아니라서 map 에러? // 기본 값을 []로 바꾸었더니 에러는 안 나지만 배열(0개)를 받아 온다, 즉 setPhotos가 업데이트가 안됨
    
    // const openModal = () => {
    //     setIsModalOpen(true)
    // }
    
    //   const closeModal = () => {
    //     setIsModalOpen(false)
    // }
    

    return (
        <div className="contentspage">
            
            <div className="header">
                <Header />
            </div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="contents" >

                {photos.map(photo => 
                    <ContentsPageEntry key={photo.id} photo={photo.path} />
                    // 실제 photo가 가지고 있는 속성들에는 무엇 무엇이 있는가?
                )}
            </div>
        </div>
    )
}


export default ContentsPage; 
// withRouter로 감싸면 규칙에서 벗어나 Link등을 자유로이 쓸 수 있다(부모로부터 Router 속성 물려 받음) // 사용법 확인
