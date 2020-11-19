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
        const res = await authedAxios.get('http://34.64.248.85:8080/content')
        console.log('이미지 가져오기 함수', res.data)
        setPhotos(res.data);
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
        console.log('태그 기준 정렬', res);
        setPhotos(res.config.url);
      }

      const getPhotosByLike = async () => {
        const authedAxios = axios.create(
          { headers: { 
              Authorization: `${token}`
          }}
        );
        const res = await authedAxios.get('http://34.64.248.85:8080/content/favs')
        console.log('좋아요 기준 정렬', res);
        setPhotos(res.data);
      }  

    return userInfo !== null ? (
        <div className="contentspage">
            <div className="header">
                <Header userInfo={userInfo} token={token} LogOutHandler={LogOutHandler}/>
            </div>
            <div className="sidebar">
                <SideBar 
                    token={token} 
                    getPhotosByTag={getPhotosByTag} 
                    setTagForSort={setTagForSort} 
                    onUpdate={onUpdate}
                    getPhotosByLike={getPhotosByLike}/>
            </div>
            <div className="contents" >
                {photos.map(photo => 
                    <ContentsPageEntry key={photo.id} photo={photo} userInfo={userInfo} token={token} />
                )}
            </div>
        </div>
    ) : (
        <Redirect to='/login' />
    )
}

export default ContentsPage; 
