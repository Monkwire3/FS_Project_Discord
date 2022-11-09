import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import ServerDropDown from '../ServerDropDown';
import '../leftSideBar/LeftSidebar.css';



function ServerDropDownModal({ serverId }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);

    }

    return (
        // <h1>dropdown placeholder </h1>
        // <div onClick={setShowModal(true)} id='channelsHeader'>
        <div> // TEMP
            <div>{serverId}</div>
            <div id="dropDownToggle">
                <svg className='dropIcon' width={18} height={18}>
                    <g fill='none' fillRule="evenodd">
                        <path d="M0 0h18v18H0"></path>
                        <path stroke="#d8d9da" d="M4.5 4.5l9 9" strokeLinecap="round"></path>
                        <path stroke="#d8d9da" d="M13.5 4.5l-9 9" strokeLinecap="round"></path>
                    </g>
                </svg>
            </div>
            {showModal && (
                <Modal onClose={handleClose}>
                    <ServerDropDown server={serverId} onClose={handleClose} />
                </Modal>
            )}

        </div>

    )
}

export default ServerDropDownModal;