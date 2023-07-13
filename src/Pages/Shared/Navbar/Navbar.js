import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [color, setColor] = useState('white');

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const handleBackground = (color) => {
        setColor(color)
    }
    useEffect(() => {
        document.body.style.backgroundColor = color;
    }, [color])

    const navItems = <>
        <li><Link onClick={() => handleBackground('black')}>Mode</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/about">About</Link></li>

        {
            user?.uid ?
                <>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link className='items-center' onClick={handleLogOut}>Sign Out</Link></li>
                </>
                :
                <li><Link to="/login">Login</Link></li>
        }
    </>
    return (
        <div className="flex justify-between navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <ul tabIndex={1} className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="text-xl normal-case btn btn-ghost">Doctors Portal</Link>
            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    {navItems}
                </ul>
            </div>
            <label htmlFor="dashboardDrawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;