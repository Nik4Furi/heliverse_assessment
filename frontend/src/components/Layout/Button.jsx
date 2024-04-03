import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ title, type = 'button', handleClick, btnmsg = '', disabled = false, w = 'full' }) => {
    return (
        <>
            <button type={type} title={btnmsg} disabled={disabled} className={`group relative w-${w} flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
            
            ${disabled ? `bg-indigo-300 hover:bg-indigo-400 focus:ring-indigo-300` : `bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`} focus:outline-none focus:ring-2 focus:ring-offset-2  cursor-pointer`} onClick={handleClick} >
                {title}
            </button>
        </>
    )
}

export default Button

//-------------- Link Button
export const LinkButton = ({ title, handleClick,link }) => {
    return (
        <>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleClick} > <Link to={`/${link}`}> {title} </Link></button>
        </>
    )
}
