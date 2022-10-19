import { Modal } from '../../context/Modal'
import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';

function NewServerFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className="serverIndexItem" onClick={() => setShowModal(true)}>+</div>
        {showModal && (
            <Modal onClose={(e) => setShowModal(false)}>
                <CreateChannelForm  />
            </Modal>
        )}
        </>
    )
}

export default NewServerFormModal;