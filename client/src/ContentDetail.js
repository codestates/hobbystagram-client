import React from 'react';

import Comments from './Comments';
import Likes from './Likes';
import './ContentsDetail.css';

function ContentDetail({ photo, userInfo, token, handlePhotoModal }) {
    return(
        <div className="modal">
            <img
                className="photo-expanded"
                src={photo.photo}
                onClick={handlePhotoModal}
                alt="oops!"
            />
            <Likes photo={photo} token={token} />
            <Comments photo={photo} token={token} />
        </div>
    )
}

export default ContentDetail;