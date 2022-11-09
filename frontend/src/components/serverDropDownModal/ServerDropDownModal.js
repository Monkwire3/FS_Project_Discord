import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import ServerDropDown from '../ServerDropDown';



function ServerDropDownModal({server}) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);

    }

    return (
        <>
        {showModal && (
            <Modal onClose={handleClose}>
                <ServerDropDown server={server} onClose={handleClose}/>
            </Modal>
        )}
        </>
    )
}

export default ServerDropDownModal;