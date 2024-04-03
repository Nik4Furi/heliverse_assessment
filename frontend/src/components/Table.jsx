import React from 'react'

const Table = () => {
  return (
    <>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" className="px-6 py-3">
                Make Team
            </th>
            <th scope="col" className="px-6 py-3">
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
    <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap flex items-center">
                <img src={'https://via.placeholder.com/50'} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                <div>
                    <div className="text-sm leading-5 font-medium text-white">{'John'} {"Doe"}</div>
                    <div className="text-xs leading-4 text-gray-500">{"johndoe@gmail.com"}</div>
                </div>
            </td>
            <td className="px-6 py-4">
                Silver
            </td>
            <td className="px-6 py-4">
                Laptop
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
                <span className={`inline-block rounded-full w-3 h-3 mr-1 ${true ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {true ? 'Yes' : 'No'}
            </td>
            <td className="px-6 py-4">
                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
            </td>
        </tr>

    </tbody>
</table>


<nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 ">1-10</span> of <span className="font-semibold text-gray-900 ">1000</span></span>
    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
        </li>
        <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        </li>
        <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        </li>
        <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        </li>
        <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        </li>
    </ul>
</nav>


</div>
    </>
  )
}

export default Table
