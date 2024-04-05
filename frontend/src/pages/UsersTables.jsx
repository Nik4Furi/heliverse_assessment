import React, { Suspense, lazy, useEffect, useState } from 'react'

//---------- State handle stuff
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateTeam, handleFetchUsers } from '../../Store/UsersSlice';

//---------- Icons
import { IoSearchSharp } from "react-icons/io5";

//----- Components Stuff
import Button from '../components/Layout/Button';
import Loading from '../components/Layout/Loading';
import { Token } from '../GlobalFunctions';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import FormInputBox from '../components/Layout/FormInputBox';
import { PaginationTable } from '../components/Table';
const Table = lazy(() => import('../components/Table'))


const UsersTables = () => {

    //-------------- Store stuff
    const dispatch = useDispatch();
    const { allUsers: usersData, loading, currentPage, totalPage, pageLastLimit } = useSelector(state => state.user);

    //------------------ State stuff
    const [form, setForm] = useState({ name: '', gender: '', available: '' });
    const [filterForm, setFilterForm] = useState(true);

    //------------------ Create the team by the logged users
    const [isSelectMemberse, setIsSelectMembers] = useState(true);
    const [teamForm, setTeamForm] = useState({ title: '', description: '', membersIds: [] })

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpenModal = () => setIsOpen(true);

    const handleTeamChange = (e) => setTeamForm({ ...teamForm, [e.target.name]: e.target.value })

    const handleChangeMembersCheckbox = (_id) => { //on change to add ids in members
        setIsSelectMembers(false);

        setTeamForm((prev) => ({ ...prev, membersIds: [...prev.membersIds, _id] }));
    }

    const [checkboxFalse, setCheckBoxFalse] = useState(false);

    const handleAddMembers = (e) => { //adding the team details into users carts
        e.preventDefault();

        if (teamForm.membersIds?.length < 1) {
            toast.error("Before create team, choose members")
            return;
        }

        dispatch(handleCreateTeam(teamForm));

        setTeamForm({ title: '', description: '', membersIds: [] });

        setCheckBoxFalse(true);
    }

    //------------- Function stuff
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFilter = (e) => { //filter the data by the form data
        e.preventDefault();

        setFilterForm(false);

        if (form.name || form.available || form.gender) {
            const name = form.name, domain = form.name, available = form.available, gender = form.gender;
            dispatch(handleFetchUsers(1, name, domain, gender, available))
        }
    }
    const ClearFilterForm = () => {
        setForm({ name: '', available: '', gender: '' });
        const page = currentPage;
        dispatch(handleFetchUsers(page));
        setFilterForm(true);
    }

    //---------------------- handle the pagination prev and next
    const handlePrev = () => {
        console.log('pages  lastlimit curr total ',pageLastLimit,currentPage,totalPage)
        if (currentPage <= 1) {
            toast.error("The page filter ended, can't move further")
            return;
        }
        if (currentPage > 1) {
            const page = currentPage - 1;

            if (form.name || form.available || form.gender) {
                const name = form.name, domain = form.name, available = form.available, gender = form.gender;
                dispatch(handleFetchUsers(page, name, domain, gender, available))
            }
            dispatch(handleFetchUsers(page));
        }
    }

    const handleNext = () => {
        if (pageLastLimit === 0) {
            toast.error("The page filter ended, can't move further")
            return;
        }

        if (currentPage < totalPage) {
            const page = currentPage + 1;
            if (form.name || form.available || form.gender) {
                const name = form.name, domain = form.name, available = form.available, gender = form.gender;
                dispatch(handleFetchUsers(page, name, domain, gender, available))
            }
            dispatch(handleFetchUsers(page));
        }
    }

    //-------------- function to move a page
    const handleMove = (page) => {
        dispatch(handleFetchUsers(page));
    }


    //---------- Fetch all the starting users
    useEffect(() => {
        if (Token)
            dispatch(handleFetchUsers());
    }, [dispatch])

    return (
        <>
            {/* ------------------- Form modal to create the teams ----------------- */}
            <Modal isOpen={isOpen} onClose={handleClose} >
                <h2 className="text-xl">Create your <span className="text-highlight">Team</span>, and set your team members</h2>
                <form className="mt-8 space-y-6" onSubmit={handleAddMembers}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">


                        <FormInputBox label={'Title'} name={'title'} handleChange={handleTeamChange} value={teamForm.title} placeholder={'title of your team, like "Develop Jira"'} maxL={420} minL={5} />

                        <FormInputBox label={'Description'}
                            name={'description'} handleChange={handleTeamChange} value={teamForm.description} minL={8} maxL={920} placeholder={'Tell something about your team'} />

                    </div>


                    <div>
                        <Button type='submit' title={'Create Team'} loading={loading} />
                    </div>
                </form>
            </Modal>

            <main id="UsersTables">
                <section className="mx-auto w-[100%] md:w-[80%] my-6 p-4">

                    <div className="flex items-center justify-between">

                        <small>Figure Out Users</small>

                        <Button title={'Create Team'} handleClick={isSelectMemberse === false ? handleOpenModal : undefined} disabled={isSelectMemberse} btnmsg='Select the users and create team' w='30%' />

                    </div>
                    <h1 className='mb-4 text-3xl font-bold' >Catch all the users, who are denoting our network</h1>


                    <form onSubmit={handleFilter} className=' flex items-center justify-center mb-8 gap-4 w-[100%] flex-wrap '>

                        <select
                            className="cursor-pointer block p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg w-[40%] md:w-[20%] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="gender"
                            value={form.gender}
                            onChange={handleChange}
                        >
                            <option className='cursor-pointer' value="Male">Chose Gender</option>
                            <option className='cursor-pointer' value="Male">Male</option>
                            <option className='cursor-pointer' value="Female">Female</option>
                            <option className='cursor-pointer' value="Other">Other</option>
                        </select>
                        <select
                            className="cursor-pointer block p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-[50%] md:w-[20%] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="available"
                            value={form.available}
                            onChange={handleChange}
                        >
                            <option className='cursor-pointer' >Chose Availablility</option>
                            <option className='cursor-pointer' value="true">Available</option>
                            <option className='cursor-pointer' value="false">Not Available</option>
                        </select>
                        <div className="relative">
                            <div className="absolute inset-y-0 top-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                <IoSearchSharp />
                            </div>
                            <input type="text" id="table-search" name='name' value={form.name} onChange={handleChange} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-[100%] md:w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users by name,domain only" />
                        </div>
                        <Button title={'Search'} w='auto' type='submit' />


                    </form>
                    <Button title={'Clear Filter'} handleClick={filterForm === false && ClearFilterForm} disabled={filterForm} disabledCol='red-300' disabledHoverCol='red-400' color='red-600' hover='red-700' btnmsg='Clear the filter form' />

                    {/* ---------------- Table component of the users --------------  */}

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
                        <Suspense fallback={<Loading />}>

                            <Table data={usersData} currentPage={currentPage} handleChangeMembersCheckbox={handleChangeMembersCheckbox} totalPage={totalPage} handleNext={handleNext} handlePrev={handlePrev} />
                        </Suspense>


                        {/* ---------- ------------------ Handle the stuff of the Pagination  */}
                        <Suspense fallback={<Loading />}>

                            <PaginationTable loading={loading} handleMove={handleMove} currentPage={currentPage} totalPage={totalPage} handleNext={handleNext} handlePrev={handlePrev} />
                        </Suspense>

                    </div>
                </section>
            </main>
        </>
    )
}

export default UsersTables

