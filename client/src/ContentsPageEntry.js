import React, { useState } from 'react';
import ContentDetail from './ContentDetail';
import './ContentsPageEntry.css';

function ContentsPageEntry({ photo, token, userInfo }) {

    const [isOpen, setIsOpen] = useState(false);

    const handlePhotoModal = () => {
        setIsOpen(!isOpen) // 현 상태와 반대로 만들어 줌
    }

    return (
        <div className="images">
            <img
                className="photo"
                src={photo.photo}
                onClick={handlePhotoModal}
                alt="oops!"
            />
            {isOpen && (
                <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                >
                    <button onClick={handlePhotoModal}>창 닫기</button>
                    <ContentDetail photo={photo} userInfo={userInfo} token={token} handlePhotoModal={handlePhotoModal}/>
                </dialog>
            )}
        </div>
    )
}

export default ContentsPageEntry;