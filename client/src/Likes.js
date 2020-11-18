import React, { useState, useEffect } from 'react';
import axios from "axios";

function Likes({ photo, token }) {
    console.log("photophoto", photo)
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    
    // (contents page)
    // 사진 올리기, 사진 받아 오기 // 사진 새로 받아오기(새로 고침 - 로그 아웃 문제) - 새로 고침 시, 자기 사진 삭제 시, 좋아요나 태그별로 볼 시
    // 태그 보내기, 태그 받아 오기 // 현재 안됨
    // 댓글 올리기, 댓글 받아 오기
    // 좋아요 여부 보내기, 좋아요 갯수 받아 오기

    const axiosLikesCount = async () => { // 서버에서 해당 사진의 좋아요 갯수 받아오기
        const authedAxios = axios.create(
            { headers: { 
                Authorization: `${token}`
            }}
        );
        const res = await authedAxios.get(`http://34.64.248.85:8080/content/like/${photo.id}`) // url // axios 변수 설정으로 url을 넣을 수도 있다
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
        
        authedAxios.post(`http://34.64.248.85:8080/content/like/${photo.id}`, true) // 카운트가 아니라 boolean 값
        .then(res => {
            console.log("likePost", res)
            if (res.status === 200) {
                axiosLikesCount() // 좋아요 보내고, 제대로 보내졌으면 업데이트 받기
            } // 이상하게 1번 사진에서는 좋아요 취소하면 좋아요 숫자가 증가하는 에러가 난다(다른 유저가 이미 누른 상태?)
        })
        .then(
            setIsLike(!isLike)
        ) // 현 상태와 반대로 만들어 줌
    }
    
    // 렌더링 되는 것, 횟수 조심

    const text = isLike === false ? '좋아요 👍' : '좋아합니다 👌';

    return (
        <div>
            <button onClick={(event) => {handleLikeStatus(event)}}>{text}</button>
            <h4>{likesCount}명이 좋아합니다 👌</h4>
        </div>
    )
}

export default Likes;