import React, { useState, useEffect } from 'react';
import axios from "axios";

import './Likes.css';

function Likes({ photo, token }) {
    console.log("photophoto", photo)

    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const axiosLikesCount = async () => {
        const authedAxios = axios.create(
            { headers: { 
                Authorization: `${token}`
            }}
        );
        const res = await authedAxios.get(`http://34.64.248.85:8080/content/like/${photo.id}`)
        console.log("like", res)
        setLikesCount(res.data.likeCount);
    }

    useEffect(() => {
        // axiosLikesCount()
        console.log("확인, photo.id", photo.id)

        const authedAxios = axios.create(
            { headers: { 
                Authorization: `${token}`
            }}
        );

        authedAxios.get(`http://34.64.248.85:8080/content/like_status/${photo.id}`) // like_status
        .then(res => {
            console.log("likePost", res)
            if (res.status === 200) {
                if (res.data.isLiked === false) { // todo - 리팩토링 해야됨 // 좋아요 눌려있는 경우 - OK / 좋아요 안눌려있는 경우 - 첫 버튼이 반대로 나옴 - 서버에서 해결함
                    setIsLike(false)
                } else if (res.data.isLiked === true) {
                    setIsLike(true)
                }
                axiosLikesCount() // likesCount
            }
        })
        console.log("확인, isLike", isLike)
    },[])

    function handleLikeStatus(event) {
        event.preventDefault()

        const authedAxios = axios.create(
            { headers: { 
                Authorization: `${token}`
            }}
        );
        
        authedAxios.post(`http://34.64.248.85:8080/content/like/${photo.id}`)
        .then(res => {
            console.log("likePost", res)
            if (res.status === 200) {
                if (res.data.message === "좋아요 취소 완료 ") {
                    setIsLike(false)
                } else {
                    setIsLike(true)
                }
                axiosLikesCount()
            }
        })
        // .then(
        //     setIsLike(!isLike)
        // )
    }

    const text = isLike === false ? '좋아요 👍' : '좋아합니다 👌';
    
    return (
        <div className="like-container">
            <button className="like-button" onClick={(event) => {handleLikeStatus(event)}}>{text}</button>
            <h4 className="how-many-people-likes">{likesCount}명이 좋아합니다 👌</h4>
        </div>
    )
}

export default Likes;