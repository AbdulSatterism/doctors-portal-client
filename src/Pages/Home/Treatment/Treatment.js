import React from 'react';
import treatment from '../../../assets/images/treatment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Treatment = () => {
    return (
        <div className="hero mt-16 p-8">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='ml-4'>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">We provide our service for people. It's our responsibility also. Dental service need everybody anytime</p>
                    <PrimaryButton>Get Treatment</PrimaryButton>
                </div>
                <img src={treatment} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />

            </div>
        </div>
    );
};

export default Treatment;