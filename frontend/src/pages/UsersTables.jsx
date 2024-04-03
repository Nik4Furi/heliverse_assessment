import React, { useState } from 'react'
import Button from '../components/Layout/Button';
import Table from '../components/Table';

const UsersTables = () => {

    const usersData = [
        { id: 1, avatar: 'https://via.placeholder.com/50', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', gender: 'Male', domain: 'Engineering', available: true },
        { id: 2, avatar: 'https://via.placeholder.com/50', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', gender: 'Female', domain: 'Marketing', available: false },
        // Add more sample data as needed
    ];

    const [filters, setFilters] = useState({
        domain: '',
        gender: '',
        available: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredData = usersData.filter((user) =>
        user.firstName.toLowerCase().includes(filters.domain.toLowerCase()) &&
        (filters.gender === '' || user.gender === filters.gender) &&
        (filters.available === '' || user.available === (filters.available === 'true'))
    );



    return (
        <>
            <main id="UsersTables">
                <section className="mx-auto w-[80%] my-6 p-4">

                    <div className="flex items-center justify-between">

                        <small>Figure Out Users</small>

                        <Button title={'Create Team'} disabled={true} btnmsg='Select the users and create team' w='30%' />
                    </div>
                    <h1 className='mb-4 text-3xl font-bold' >Catch all the users, who are denoting our network</h1>


                    <div className='flex items-center justify-center mb-8 gap-4 w-[100%] '>
                        <div className="flex justify-center gap-4 items-center">

                            <select
                                className="block p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="gender"
                                value={filters.gender}
                                onChange={handleFilterChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <select
                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="available"
                                value={filters.available}
                                onChange={handleFilterChange}
                            >
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 top-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users by name,domain only" />
                        </div>
                        <Button title={'Search'} />

                    </div>

                    {/* ---------------- Table component of the users --------------  */}

                 <Table />

                </section>
            </main>
        </>
    )
}

export default UsersTables

