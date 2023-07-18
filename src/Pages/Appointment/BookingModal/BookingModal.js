import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { toast } from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name: treatmentName, slots, price } = treatment; //treatment is also appointment option
    const date = format(selectedDate, "PP");
    const { user } = useContext(AuthContext)

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const slot = form.slot.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patient: name,
            slot: slot,
            phone: phone,
            email: email,
            price: price
        }
        //sent data to the server
        // once data is saved then close the modal
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirm');
                    refetch()
                }
                else {
                    toast.error(data.message);
                }
            })

    }

    return (
        <>
            <dialog id="booking_modal" className="modal">
                <form method="dialog" className="modal-box h-full">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg text-primary">{treatmentName}</h3>
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
                    <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your name" className="input input-bordered input-primary w-full" />
                    <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Enter your email" className="input input-bordered input-primary w-full" />
                    <input name='phone' type="number" placeholder="Enter your phone" className="input input-bordered input-primary w-full" />
                    <input type="submit" className="btn btn-accent w-full" value="Submit" />

                </form>
            </dialog>
        </>
    );
};

export default BookingModal;