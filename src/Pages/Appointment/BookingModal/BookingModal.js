import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    const { name, slots } = treatment; //treatment is also appointment option
    const date = format(selectedDate, "PP");

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const slot = form.slot.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: name,
            patient: name,
            slot: slot,
            phone: phone,
            email: email
        }
        //sent data to the server
        // once data is saved then close the modal
        console.log(booking)
        setTreatment(null)
    }

    return (
        <>
            <dialog id="booking_modal" className="modal">
                <form method="dialog" className="modal-box h-full">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg text-primary">{name}</h3>
                </form>

                <form onSubmit={handleBooking} className=' modal-box grid gap-2 mt-10 grid-cols-1'>
                    <input type="text" disabled value={date} className="input input-bordered input-primary w-full" />
                    <select name='slot' className="select select-bordered w-full">
                        {
                            slots?.map((slot, i) => <option
                                value={slot}
                                key={i}
                            >{slot}</option>)
                        }

                    </select>
                    <input name='name' type="text" placeholder="Your name" className="input input-bordered input-primary w-full" />
                    <input name='email' type="email" placeholder="Enter your email" className="input input-bordered input-primary w-full" />
                    <input name='phone' type="number" placeholder="Enter your phone" className="input input-bordered input-primary w-full" />
                    <input type="submit" className="btn btn-accent w-full" value="Submit" />

                </form>
            </dialog>
        </>
    );
};

export default BookingModal;