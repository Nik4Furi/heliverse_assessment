import React, { useState } from 'react'
import Button, { LinkButton } from './Button';

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'
import { logoutUser } from '../../../Store/UsersSlice'

const Navbar = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');

        dispatch(logoutUser());
        navigate('/');
    };
let name = user?.first_name + " "+ user?.last_name;
name = name?.length > 10 ? name?.splice(8) : name;
    const [dropDown, setDropDown] = useState(false);

    return (
        <>


            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/users" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Heliverse</span>
                    </Link>

                    <div className="flex items-center justify-between">

                        <div className="flex items-center cursor-pointer" onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} >
                            <img
                                src={user?.avatar ? user?.avatar : "https://via.placeholder.com/50"}
                                alt="Admin Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-highlight capitalize">{name ? name : "Anonymous"}</span>
                        </div>
                        {dropDown &&
                            <div className="relative" onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                               
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 border z-20">

                                    <LinkButton title={'Profile'} link={'profile'} />
                                    <LinkButton title={'Teams'} link={'teams'} />
                                    <LinkButton title={' Logout'} handleClick={handleLogout} />
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
