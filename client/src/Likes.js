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

    axiosLikesCount()

    function handleLikeStatus(event) {
        event.preventDefault()

        const authedAxios = axios.create(
            { headers: { 
                Authorization: `${token}`
            }}
        );
        
        authedAxios.post(`http://34.64.248.85:8080/content/like/${photo.id}`, true)
        .then(res => {
            console.log("likePost", res)
            if (res.status === 200) {
                axiosLikesCount()
            }
        })
        .then(
            setIsLike(!isLike)
        )
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