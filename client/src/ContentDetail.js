import React from 'react';

import Comments from './Comments';

function ContentDetail({ photo, handlePhotoModal }) { // 모달창 내부 속성
    return(
        <div>
            <img
                className="photo-expanded"
                src={photo}
                onClick={handlePhotoModal}
                alt="oops!"
            />
            {/* 댓글 기능
            좋아요 기능 <-> 연동
            photo 삭제 및 목록 새로고침 기능 <-> 연동 */}
            <Comments />
        </div>
    )
}

export default ContentDetail;