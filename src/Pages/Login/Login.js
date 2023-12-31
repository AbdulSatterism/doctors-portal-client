import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setLoginUserEmail(data.email)
            })
            .catch(err => {
                setLoginError(err.message)
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center text-primary'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" className="w-full max-w-xs input input-bordered"
                            {...register("email", { required: "Email Address is required" })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" className="w-full max-w-xs input input-bordered"
                            {...register("password",
                                {
                                    required: "password is required",
                                    minLength: { value: 6, message: 'password must be 6 character or longer' }
                                },
                            )}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password</span></label>
                    </div>

                    <input className='w-full btn btn-accent' value="Login" type="submit" />
                    <div>
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                    </div>
                </form>
                <p>New to Doctors portal?<Link className='text-primary' to='/signup'>Create new account</Link></p>
                <div className="divider">Or</div>
                <button className='w-full btn btn-outline'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;