import React, { useState } from 'react';
import axios from "axios";

function Likes() {
    const [isLike, setIsLike] = useState(false);

    const handleLikeStatus = () => {
        setIsLike(!isLike) // 현 상태와 반대로 만들어 줌
    }

    const text = isLike === false ? '좋아요 👍' : '좋아합니다 👌';

    // 서버에서 likes 갯수 받아오기
    const likesCount = () => {
        axios
          .get('http://34.64.248.85:8080/user/like') // id?
          .then(res => {
              console.log(res.data)
          })
    }

    likesCount()

    return (
        <div>
            <button onClick={handleLikeStatus}>{text}</button>
            <p>{}명이 좋아합니다</p>
        </div>
    )
}

export default Likes;