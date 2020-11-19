import React, { useState, useEffect }  from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

import Header from './Header';
import SideBar from './SideBar';
import ContentsPageEntry from './ContentsPageEntry';
import './ContentsPage.css';
import './SideBar.css';

// fake data 삭제

const tags = [
    {
      label: "tag",
      value: "default",
    },
    {
      label: "Trip",
      value: "tr",
    },
    {
      label: "Seoul",
      value: "se",
    },
    {
      label: "Puppy",
      value: "po",
    },
    {
      label: "Kitten",
      value: "ki",
    },
  ];

function ContentsPage({ userInfo, token, LogOutHandler, redirectToMyPage }) {
    console.log(userInfo);
    console.log(token)
    
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
    const [tagForSort, setTagForSort] = useState(tags[0]);
    
    const axiosPhotos = async () => {
        const authedAxios = axios.create(
            { headers: { 
                Authorization: `${token}`
            }}
        );
        const res = await authedAxios.get('http://34.64.248.85:8080/content') // url // axios 변수 설정으로 url을 넣을 수도 있다
        console.log('이미지 가져오기 함수', res.data)
        setPhotos(res.data);
        // 임시 -> 실제 데이터
    }

    const onUpdate = () => {
        axiosPhotos()
    }

    useEffect(() => { // componentDidMount()와 비슷한 역할
      // getPhotos()
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

    const getPhotosByTag = async () => {
        const authedAxios = axios.create(
          { headers: { 
              Authorization: `${token}`
          }}
        );
        const res = await authedAxios.get(`http://34.64.248.85:8080/content/tag?name=${tagForSort}`)
        console.log('사진 제대로 받아오나?', res);
    }

    return userInfo !== null ? (
        <div className="contentspage">
            <div className="header">
                <Header userInfo={userInfo} token={token} LogOutHandler={LogOutHandler}/>
            </div>
            <div className="sidebar">
                <SideBar token={token} getPhotosByTag={getPhotosByTag} setTagForSort={setTagForSort} onUpdate={onUpdate}/>
            </div>
            <div className="contents" >
                {photos.map(photo => 
                    <ContentsPageEntry key={photo.id} photo={photo} userInfo={userInfo} token={token} />
                    // 실제 photo가 가지고 있는 속성들에는 무엇 무엇이 있는가?
                )}
            </div>
        </div>
    ) : (
        <Redirect to='/login' />
    )
}

export default ContentsPage; 
