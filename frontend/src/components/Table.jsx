import React from 'react'
import Loading from './Layout/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteUsers } from '../../Store/UsersSlice';

const Table = ({ data,handleChangeMembersCheckbox }) => {

    const dispatch = useDispatch();   
    const { loading } = useSelector(state => state.user);

    //----------- handle delete the user
    const handleDelete = (_id) => {
        dispatch(handleDeleteUsers(_id));
    }



    return (
        <>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 cursor-pointer">

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Make Team
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Domain
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='min-h-screen'>
                        {loading && <Loading />}
                        {data?.map((user, i) => (

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>

                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" onChange={()=>handleChangeMembersCheckbox(user?._id)} />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap flex items-center ">
                                    <img src={user?.avatar ? user?.avatar : 'https://via.placeholder.com/50'} alt="Avatar" className="w-8 h-8 rounded-full mr-2 " />

                                    <div>
                                        <div className="text-sm leading-5 font-medium text-white">{user?.first_name} {user?.last_name}</div>
                                        <div className="text-xs leading-4 text-gray-500">{user?.email}</div>
                                    </div>
                                </td>

                                <td className="px-6 py-4"> {user?.domain} </td>

                                <td className="px-6 py-4"> {user?.gender} </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <span className={`inline-block rounded-full w-3 h-3 mr-1 ${user?.available ? 'bg-green-500' : 'bg-red-500'}`}></span>

                                    {user?.available ? 'Yes' : 'No'}
                                </td>

                                <td className="px-6 py-4">
                                    <p onClick={() => handleDelete(user?._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</p>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
        </>
    )
}

export default Table

//----------------- Pagination the tables data
const PaginationStyleButton = ({ title, handleClick, loading }) => {

    return (
        <li>
            <p onClick={handleClick} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">{loading ? <Loading />: title}</p>
        </li>
    )
}

export const PaginationTable = ({ currentPage, totalPage, handleNext, handlePrev,handleMove,loading }) => {

    //---------------- Set the limit how many numbers we can see
    const range = 1; // Number of pages to show before and after the current page
    const startPage = Math.max(1, currentPage - range);
    const endPage = Math.min(totalPage - 1, currentPage + range);

    // Calculate the range of page numbers to display
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // Add the first and last page numbers if they're not already in the range
    if (startPage > 2) {
        pages.unshift(1);
    }
    if (endPage < totalPage - 1) {
        pages.push(totalPage-1);
    }

    return (
        <>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-center md:justify-between p-2" aria-label="Table navigation">

                <div className="text-sm font-normal text-center text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 ">{currentPage}</span> page out of <span className="font-semibold text-gray-900 ">{totalPage}</span></div>

                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <PaginationStyleButton title={'Previous'} loading={loading} handleClick={loading ? undefined : handlePrev} />

                    {pages && pages.map((page, i) => (
                        <PaginationStyleButton key={i} title={page} handleClick={() => handleMove(page)} />
                    ))}

                    <PaginationStyleButton loading={loading} title={'Next'} handleClick={loading ? undefined : handleNext} />
                </ul>
            </nav>

        </>
    )
}
