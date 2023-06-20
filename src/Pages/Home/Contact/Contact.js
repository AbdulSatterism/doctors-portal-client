import React from 'react';
import backImage from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Contact = () => {
    return (
        <section
            style={{ background: `url(${backImage})` }}
            className='flex justify-center mt-20 p-5'>
            <div>
                <div className='text-center mb-8 p-2'>
                    <h4 className='text-xl text-primary'>Contact us</h4>
                    <h1 className='text-4xl text-white'>Stay connected with us</h1>
                </div>
                <form className=''>
                    <input type="email" placeholder="enter email" className="input  input-primary w-full mb-2 " /><br />
                    <input type="text" placeholder="subject" className="input  input-primary w-full mb-2" /><br />
                    <textarea className="textarea textarea-primary w-full mb-2" placeholder="message"></textarea>

                    <div className='text-center'>
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>

            </div>

        </section>
    );
};

export default Contact;