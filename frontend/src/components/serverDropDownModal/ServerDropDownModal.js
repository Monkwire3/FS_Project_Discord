import { Modal } from '../../context/Modal';
import React, { useEffect, useState } from 'react';
import ServerDropDown from '../ServerDropDown';
import '../leftSideBar/LeftSidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServer, getServer } from '../../store/servers';



function ServerDropDownModal({ server, setServerChanged }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServer(server.id));
    }, []);



    const [showModal, setShowModal] = useState(false);


    return (
        <>
        <div onClick={() => setShowModal(true)} id='channelsHeader'>
            <div>{server ? server.serverName : ''}</div>
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
                    <ServerDropDown onClose={() => setShowModal(false)} server={server} setShowModal={setShowModal} setServerChanged={setServerChanged} />
                </Modal>
            )}

        </>

    )
}

export default ServerDropDownModal;