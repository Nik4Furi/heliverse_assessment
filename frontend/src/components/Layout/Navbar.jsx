import React, { useState } from 'react'
import Button, { LinkButton } from './Button';

import { Link } from 'react-router-dom'

const Navbar = () => {
    const handleLogout = () => {
        // Implement logout functionality
        console.log('Logged out');
    };

    const handleCreateTeam = () => {
        // Implement create team functionality
        console.log('Create team');
    };

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
                                src="https://via.placeholder.com/50"
                                alt="Admin Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-highlight">Admin Name</span>
                        </div>
                        {dropDown &&
                            <div className="relative" onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
                                <button
                                    type="button"
                                    className="flex items-center focus:outline-none text-white"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M2 10c0-2.205 1.795-4 4-4h8a4.001 4.001 0 013.874 3.076A5 5 0 1110 18a1 1 0 002 0 7 7 0 107-7c0-3.314-2.686-6-6-6H6a2 2 0 01-2-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 border z-20">


                                  <LinkButton title={'Profile'} link={'profile'} />
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        <Link to={'/teams'} >Teams</Link>
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
