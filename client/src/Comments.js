import React, { useState, useEffect } from 'react';
import axios from "axios";

import './Comments.css';

function Comments ({ photo, token }) {

  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  
  const axiosComment = async () => {
    const authedAxios = axios.create(
        { headers: { 
            Authorization: `${token}`
        }}
    );
    const res = await authedAxios.get(`http://34.64.248.85:8080/content/${photo.id}`)
    console.log("comment", res)
    setList(list.concat(res.data[0].comments[0].comment));
    // 서버에 get 요청 코드가 없다..? // 해결! // 반응형 크기 수정 필요..
  }

  // axiosComment()

  console.log("빈 배열일리가 없어!!", list)

  function handleChange(e) {
    setText(e.target.value)
    console.log("커멘트 입력창", text)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const authedAxios = axios.create(
      { headers: { 
          Authorization: `${token}`
      }}
    );
  
    authedAxios.post(`http://34.64.248.85:8080/content/comment/${photo.id}`, {comment: text})
    .then(res => {
      console.log("커멘트를 보낸다", res.data.message) // 일단 post는 됨!
      if (res.status === 200) {
          axiosComment()
      }
    })
  }

  function removeItem(index) {
    list.splice(index, 1);
    setList(list => list.filter(item => item.index !== index))
  }

    return (
      <div>
        <form className="form-comment" onSubmit={e => handleSubmit(e)}>
          <input className="input-comment" value={text} placeholder='댓글을 입력하세요' onChange={e => handleChange(e)} />
          <button className="button-comment">작성</button>
        </form>
          <ol>
            {list.map((comment, index) => {
              return (
                <li key={index}>{comment}
                  <button onClick={() => removeItem(index)}>삭제</button>
                </li>)
            })}
          </ol>
      </div>
    )
}

export default Comments;