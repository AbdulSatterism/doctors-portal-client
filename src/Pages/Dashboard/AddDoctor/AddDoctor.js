import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate()

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data
        }
    })

    const handleAddDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    };
                    //save doctor info in the database 
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result)
                            if (result.acknowledged) {
                                toast.success(`${data.name} is added successfully`);
                                navigate('/dashboard/managedoctors')
                            }
                        })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h1 className='text-xl text-center'>Add A Doctor</h1>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="w-full max-w-xs form-control">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "name is required"
                    })} className="w-full max-w-xs input input-bordered" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="w-full max-w-xs form-control">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: "email is required"
                    })} className="w-full max-w-xs input input-bordered" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="w-full max-w-xs form-control">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select
                        {...register('specialty')}
                        className="select input-bordered w-full max-w-xs">
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }

                    </select>
                </div>
                <div className="w-full max-w-xs form-control">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "photo is required"
                    })} className="w-full max-w-xs input input-bordered" />
                    {errors.name && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='w-full mt-4 btn btn-accent' value="Add Doctor" type="submit" />
                <div>
                    {/* {signupError && <p className='text-red-600'>{signupError}</p>} */}
                </div>
            </form>
        </div>
    );
};

/**
*. three places to store images 
*1. third party image hosting server
*2. file system of your server 
*3. mongodb (database)
 */

export default AddDoctor;