import { Modal } from '../../context/Modal'
import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import CreateServerForm from '../createServerForm';
import './newServerFormModal.css'


function NewServerFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className="addServerListItem" onClick={() => setShowModal(true)}>
            <svg viewBox='0 0 24 24'>
                <path fill="#3aa55d" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>
            </svg>

        </div>
        {showModal && (
            <Modal onClose={(e) => setShowModal(false)}>
                <CreateServerForm  />
            </Modal>
        )}
        </>
    )
}


export default NewServerFormModal;
