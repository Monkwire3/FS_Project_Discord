import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import CreateServerForm from '../createServerForm';

function CreateChannelFormModal(server) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <svg>
                    <polygon fill='#96989d' points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                </svg>
            </div>
            {showModal && (
                <Modal onClose={(e) => setShowModal(false)}>
                    <CreateChannelForm server={server} />
                </Modal>
            )}
        </>
    )

}

export default CreateChannelFormModal;