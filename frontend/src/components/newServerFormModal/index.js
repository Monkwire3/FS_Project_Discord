import { Modal } from '../../context/Modal'
import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import CreateServerForm from '../createServerForm';
import './newServerFormModal.css'


function NewServerFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className="addServerListItem" onClick={() => setShowModal(true)}>+</div>
        {showModal && (
            <Modal onClose={(e) => setShowModal(false)}>
                <CreateServerForm  />
            </Modal>
        )}
        </>
    )
}

export default NewServerFormModal;