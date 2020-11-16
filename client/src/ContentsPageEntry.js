import React, { useState } from 'react';
import ContentDetail from './ContentDetail';
import './ContentsPageEntry.css';

// 실행해 보기

function ContentsPageEntry({ photo }) {
    console.log(photo) // path를 받아 옴

    const [isOpen, setIsOpen] = useState(false);

    const handlePhotoModal = () => {
        setIsOpen(!isOpen) // 현 상태와 반대로 만들어 줌
    }

    return (
        // <React.Fragment>
        //     {isOpenModal ? 
        //     <div className="modal">
        //         <div className="modal-content">
        //             <img 
        //                 className="photo"
        //                 src={photo}
        //                 onClick={closeModal}
        //                 alt="oops!"
        //             />
        //         </div>
        //         <div className="button-wrap">
        //             <button onClick={closeModal}>닫기</button>
        //         </div>
        //     </div>
        //      : null}
        // </React.Fragment>
      
        <div className="images">
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
                    // onClick={handlePhotoModal}
                >
                    <button onClick={handlePhotoModal}>창 닫기</button>
                    <ContentDetail photo={photo} handlePhotoModal={handlePhotoModal}/>
                </dialog>
            )}
        </div>
    )
}

export default ContentsPageEntry;