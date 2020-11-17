import React, { useState, useEffect } from 'react';
import axios from "axios";

function Likes({ photo, userInfo }) {
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState('0');

    const handleLikeStatus = () => {
        setIsLike(!isLike) // 현 상태와 반대로 만들어 줌
    }

    const text = isLike === false ? '좋아요 👍' : '좋아합니다 👌';

    // const onLikeClick = () => { // 인증이 먼저 되어야 get, post를 하는데..
    //     const body = {
    //         contentId: photo.id, // ?
    //         userId: userInfo.id // ?
    //     }

    // 인증된 유저 정보를 어디로부터 받아와서 넣어주어야 하는지 // 헤더의 Authorization에 토큰 값을 넣어 주어야 하는데, 그 토큰 값은 signin할 때 나오는 토큰 값을 state나 context에 넣어서 사용
    // 현재는 인증 에러
    // 보내는 양식

    // (contents page)
    // 사진 올리기, 사진 받아 오기 // 사진 새로 받아오기(새로 고침) - 새로 고침 시, 자기 사진 삭제 시, 좋아요나 태그별로 볼 시
    // 태그 보내기, 태그 받아 오기
    // 댓글 올리기, 댓글 받아 오기
    // 좋아요 보내기, 좋아요 갯수 받아 오기

    // 서버에 like 여부 보내기
    // 서버에서 likes 갯수 받아오기

    // if (isLike === false) {
    //     axios
    //     .post('http://34.64.248.85:8080/content/like/:id', body) // id === 콘텐츠 번호
    //     .then(res => {
    //         setIsLike(true);
    //         setLikesCount(prev => prev + 1);
    //     })
    // } else {
    //     axios
    //     .post('http://34.64.248.85:8080/content/like/:id', body)
    //     .then(res => {
    //         setIsLike(false);
    //         setLikesCount(prev => prev - 1);
    //     })
    // }
    // }

    return (
        <div>
            <button onClick={handleLikeStatus}>{text}</button>
            <h4>{}명이 좋아합니다 👌</h4>
        </div>
    )
}

export default Likes;