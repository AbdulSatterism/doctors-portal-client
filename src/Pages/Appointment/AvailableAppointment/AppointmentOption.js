import React from 'react';


const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots } = appointmentOption;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-center text-secondary font-bold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'try another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} is available</p>
                <div className="card-actions justify-center">

                    <button
                        className="btn btn-primary text-white"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appointmentOption) | window.booking_modal.showModal()}
                    >Book Appointment</button>
                </div>
            </div>
        </div >
    );
};

export default AppointmentOption;