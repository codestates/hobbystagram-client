import React, { useState } from 'react';
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

  const [list, setList] = useState([]);
  const [text, setText] = useState('');

  const axiosComment = async () => { // 서버에서 해당 사진의 댓글 받아오기
    const authedAxios = axios.create(
        { headers: { 
            Authorization: `${token}`
        }}
    );
    const res = await authedAxios.get(`http://34.64.248.85:8080/content/comment/${photo.id}`)
    console.log("comment", res)
    setList(list.concat(res.data.message)); // 리스트에 추가
  }

  axiosComment() // get 에러

  function handleChange(e) { // 입력 값으로 text 상태 변경
    setText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const authedAxios = axios.create(
      { headers: { 
          Authorization: `${token}`
      }}
    );
    // const formData = new FormData(); // body 생성

    const postOptions = {
      body: JSON.stringify({ message: text})
    }

    authedAxios.post(`http://34.64.248.85:8080/content/comment/${photo.id}`, postOptions) // 입력 값을 보내 줌
    .then(res => {
      console.log("commentPost", res)
      if (res.status === 200) {
          axiosComment() // 업데이트
      }
    }) // post는 되지만, 작성 내용을 못 읽음 // body에 담아서 주어야 한다
    .then(e.target.reset())
  }

  // function removeItem(index) {
  //   list.splice(index, 1);
  //   setList(list => list.filter(item => item.index !== index))
  // }

  // 댓글 뒤에서부터만 삭제되는 것 수정(index) - 받아오는 것과 연동하여..
  // 입력 후 clear form 기능 구현
  // 기타 서버와 연동해야 할 부분들..

  console.log(list) // array

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input value={text} placeholder='댓글을 입력하세요' onChange={e => handleChange(e)} />
          <button>작성</button>
          <ol>
            {list.map((comment, index) => {
              return (
                <li key={index}>{comment}
                  {/* <button onClick={() => removeItem(index)}>삭제</button> */}
                </li>)
            })}
          </ol>
        </form>
      </div>
    )
}

export default Comments;