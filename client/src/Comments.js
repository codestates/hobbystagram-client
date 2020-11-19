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
    setList(res.data[0].comments);
    // 서버에 get 요청 코드가 없다..? // 해결! // 반응형 크기 수정 필요..
  }

  // axiosComment()

  console.log("커멘트 리스트", list)

  function handleChange(e) {
    setText(e.target.value)
    console.log("커멘트 입력창", text)
  }

  const handleSubmit = (e) => {
    // e.preventDefault();

    const authedAxios = axios.create(
      { headers: { 
          Authorization: `${token}`
      }}
    );
    authedAxios.post(`http://34.64.248.85:8080/content/comment/${photo.id}`, {comment: text}) // body {comment: text}
    .then(res => {
      console.log("커멘트를 보낸다", res.data.message) // 일단 post는 됨!
      if (res.status === 200) {
          axiosComment()
      }
    })
  }

  const handleRemoveItem = async (id) => {
    const authedAxios = axios.create(
      { headers: { 
          Authorization: `${token}`
      }}
    );

    console.log(id)

    // list.splice(index, 1);
    // setList(list => list.filter(item => item.index !== index)) // 서버와 소통 생각!
    
    const res = await authedAxios.delete(`http://34.64.248.85:8080/content/comment/${id}`)
    .then(res => {
      console.log("커멘트를 지운다", res.data.message)
      axiosComment()
    })
  }
  
    return (
      <div>
        {/* <form className="form-comment"> */}
          <input className="input-comment" value={text} placeholder='댓글을 입력하세요' onChange={e => handleChange(e)} />
          <button className="button-comment" onClick={() => handleSubmit()}>작성</button>
          <ol>
            {list.map(({ comment, id }, index) => {
              return (
                <div>
                  <li key={index}>{comment}
                    <button onClick={() => handleRemoveItem(id)}>삭제</button>
                  </li>
                </div>
                )
            })}
          </ol>
        {/* </form> */}
      </div>
    )
}

export default Comments;