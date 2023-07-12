import React, { useContext } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import { AuthContext } from '../context/AuthProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;