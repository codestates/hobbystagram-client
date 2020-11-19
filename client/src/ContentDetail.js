import React from 'react';

import Comments from './Comments';
import Likes from './Likes';
import './ContentsDetail.css';

function ContentDetail({ photo, userInfo, token, handlePhotoModal }) { // 모달창 내부 속성
    return(
        <div className="modal">
            <img
                className="photo-expanded"
                src={photo.photo}
                onClick={handlePhotoModal}
                alt="oops!"
            />
            {/* 좋아요 기능 <-> 연동
            photo 삭제 및 목록 새로고침 기능 <-> 연동 */}
            <Likes photo={photo} token={token} />
            <Comments photo={photo} token={token} />
        </div>
    )
}

export default ContentDetail;