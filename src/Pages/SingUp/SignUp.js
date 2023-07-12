import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signupError, setSignupError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate();

    if (token) {
        navigate('/')
    }

    const handleSignUp = data => {
        setSignupError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('user created successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {

                        saveUser(data.name, data.email);

                    }).catch((error) => {
                        setSignupError(error.message)
                    });
            })
            .catch(err => {
                setSignupError(err.message)
            })
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    };



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
                    <input className='w-full mt-4 btn btn-accent' value="Sign Up" type="submit" />
                    <div>
                        {signupError && <p className='text-red-600'>{signupError}</p>}
                    </div>
                </form>
                <p>Already have an account?<Link className='text-primary' to='/login'>Please login</Link></p>
                <div className="divider">Or</div>
                <button className='w-full btn btn-outline'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;