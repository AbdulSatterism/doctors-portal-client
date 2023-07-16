import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, handleDeleteDoctor, deleteButton, modalData }) => {
    return (
        <div>
            {/* Open the modal using ID.showModal() method
            <button className="btn" onClick={() => window.confirmation_modal.showModal()}>open modal</button> */}
            <dialog id="confirmation_modal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            onClick={() => handleDeleteDoctor(modalData)}
                            className="btn btn-success"
                        >{deleteButton}</button>
                        <button className="btn">Cancel</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ConfirmationModal;