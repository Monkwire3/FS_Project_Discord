import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import ServerDropDown from '../ServerDropDown';
import '../leftSideBar/LeftSidebar.css';



function ServerDropDownModal({ serverId }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
        <div onClick={() => setShowModal(true)} id='channelsHeader'>
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
        </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ServerDropDown server={serverId} onClose={() => setShowModal(false)} />
                </Modal>
            )}

        </>

    )
}

export default ServerDropDownModal;