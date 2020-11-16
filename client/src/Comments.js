import React, { useState } from 'react';
import './Comment.css';

// import CommentForm from './CommentForm';
// import CommentsList from './CommentsList';

function Comments () {
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

  function handleSubmit(e) {
    e.preventDefault();
    setList(list.concat(text))
  }

  function handleChange(e) {
    setText(e.target.value)
  }

  function removeItem(index) {
    list.splice(index, 1);
    setList(list => list.filter(item => item.index !== index))
  }

  // 댓글 뒤에서부터만 삭제되는 것 수정(index)
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
                  <button onClick={() => removeItem(index)}>삭제</button>
                </li>)
            })}
          </ol>
        </form>
      </div>
    )
}

export default Comments;