import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleSignUp = data => {
        console.log(data)
        console.log(errors)
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center text-primary'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
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
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: 'Password is required',
                            minLength: { value: 6, message: "password must be 6 or longer" },
                            // pattern: { value: /(?=.*[*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password must be strong' }
                        })} className="w-full max-w-xs input input-bordered" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='w-full btn btn-accent' value="Sign Up" type="submit" />
                </form>
                <p>Already have an account?<Link className='text-primary' to='/login'>Please login</Link></p>
                <div className="divider">Or</div>
                <button className='w-full btn btn-outline'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;