import React, { useState, useEffect } from 'react';
import axios from "axios";

import './Comments.css';

// import CommentForm from './CommentForm';
// import CommentsList from './CommentsList';

function Comments ({ photo, token }) {
//   const [comments, setComments] = useState([]);

//   function submitComment(text) {
//     const temp = comments.slice()
//     temp.push(text)
//     setComments(temp)
//   }
  
//   return (
//     <div>
//       <CommentForm submitComment={submitComment} />
//       <CommentsList comments={comments} />
//     </div>
//   )
// }

  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  
  const axiosComment = async () => { // 서버에서 해당 사진의 댓글 받아오기
    const authedAxios = axios.create(
        { headers: { 
            Authorization: `${token}`
        }}
    );
    // const res = await authedAxios.get(`http://34.64.248.85:8080/content/comment/${photo.id}`)
    // console.log("comment", res)
    // setList(list.concat(res.data.comment)); // 리스트에 추가 // undefined
    // 서버에 get 요청 코드가 없다!!!!
  }

  axiosComment()

  // axiosComment() // get 에러
  console.log("빈 배열일리가 없어!!", list) // 서버에 데이터가 없어서? 이제 있는데! // 받아오는 형식이 잘못됐나?

  function handleChange(e) { // 입력 값으로 text 상태 변경
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
    // const formData = new FormData(); // body 생성

    // const postOptions = {
    //   body: JSON.stringify({ 
    //     comment: text // data : "{"body":"{\"comment\":\"11\"}"}"
    //   })
    // }
  
    authedAxios.post(`http://34.64.248.85:8080/content/comment/${photo.id}`, {comment: text}) // 입력 값을 보내 줌 // 와 생성된다!
    .then(res => {
      console.log("커멘트를 보낸다", res.data.message) // 일단 post는 됨!
      if (res.status === 200) {
          axiosComment() // 입력 값을 포함해 댓글 목록 업데이트
      }
    })
    // .then(e.target.reset())
  }

  // function removeItem(index) {
  //   list.splice(index, 1);
  //   setList(list => list.filter(item => item.index !== index))
  // }

  // 댓글 뒤에서부터만 삭제되는 것 수정(index) - 받아오는 것과 연동하여..
  // 입력 후 clear form 기능 구현
  // 기타 서버와 연동해야 할 부분들..

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
                  {/* <button onClick={() => removeItem(index)}>삭제</button> */}
                </li>)
            })}
          </ol>
      </div>
    )
}

export default Comments;