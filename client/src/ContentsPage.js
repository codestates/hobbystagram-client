import React, { useState, useEffect }  from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import Header from './Header';
import SideBar from './SideBar';
import ContentsPageEntry from './ContentsPageEntry';
import './ContentsPage.css';
import './SideBar.css';

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

    useEffect(() => { 
        axiosPhotos()
    }, []) 
    
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
                    <ContentsPageEntry key={photo.id} photo={photo.photo} userInfo={userInfo} />
                    // 실제 photo가 가지고 있는 속성들에는 무엇 무엇이 있는가?

                )}
            </div>
        </div>
    ) : (
        <Redirect to='/login' />
    )
}

export default ContentsPage; 
