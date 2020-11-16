import React, { useState } from 'react'

import ContentDetail from './ContentDetail'

// 실행해 보기

function ContentsPageEntry({ photo }) {
    const [isOpen, setIsOpen] = useState(false);

    const handlePhotoModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <img
                className="photo"
                src={photo}
                onClick={handlePhotoModal}
                alt="oops!"
            />
            {isOpen && (
                <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={handlePhotoModal}
                >
                    {/* <img
                        className="image"
                        src={photo}
                        onClick={handlePhotoModal}
                        alt="oops!"
                    /> */}
                    <ContentDetail />
                </dialog>
            )}
        </div>
    )
}

export default ContentsPageEntry;