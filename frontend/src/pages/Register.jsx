import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', cpassword: '', domain: '', gender: '', available: false });
    const [file, setFile] = useState(null);
    const [avatar, setAvatarSrc] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleChangeFile = (e) => {
        setFile(e.target.files[0])

        const file = e.target.files[0];
        // console.log(file);
        if (file) {
            setAvatarSrc(URL.createObjectURL(file));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form, file);

    }

    return (
        <>
            <main id="Register">
                <section className="mx-auto w-[80%] my-6 p-4">

                    <h4 className="text-right"> Already have a account? <Link to={'/'} className='text-highlight' >Sign In</Link> </h4>


                    <div className=" w-[100%] p-7">

                        <div className=" bg-gray-50 py-12 px-2 sm:px-6 lg:px-8">
                            <div className="w-full space-y-8">
                                <div>
                                    <small className="mt-3">Sign Up To Heliverse</small>
                                    <h2 className="mt-1 text-3xl font-extrabold text-gray-900">Welcome ! Let's create your profile</h2>
                                </div>
                                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                    <div className="rounded-md shadow-sm -space-y-px">

                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">

                                                <label htmlFor="first-name" className="">First Name</label>

                                                <input id="first-name" name="first_name" type="text" autoComplete="given-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="John" value={form.first_name} onChange={handleChange} />

                                            </div>


                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <label htmlFor="last-name" className="">Last Name</label>
                                                <input id="last-name" name="last_name" type="text" autoComplete="family-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Doe" value={form.last_name} onChange={handleChange} />
                                            </div>
                                        </div>



                                        <div className='mb-4'>
                                            <label htmlFor="email-address" className="">Email address</label>
                                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="johndoe23@gmail.com" value={form.email} onChange={handleChange} />
                                        </div>

                                        <div className="flex flex-wrap justify-between mt-4">
                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">
                                                <label htmlFor="password" >Password</label>
                                                <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="************" value={form.password} onChange={handleChange} />
                                            </div>

                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <label htmlFor="confirm-password" >Confirm Password</label>
                                                <input id="confirm-password" name="cpassword" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="**********" value={form.cassword} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">
                                                <label htmlFor="gender" className="">Gender</label>
                                                <select id="gender" name="gender" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={form.gender} onChange={handleChange}>
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <label htmlFor="domain" className="">Domain</label>
                                                <input id="domain" name="domain" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Domain" value={form.domain} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between items-center">
                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <label htmlFor="available" className="">Available</label>
                                                <select id="available" name="available" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={form.available} onChange={handleChange}>
                                                    <option value="true">Available</option>
                                                    <option value="false">Not Available</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-1/2 md:pr-2 mb-4 flex items-center justify-center">
                                                <img className="w-30 h-10 rounded-full" src={avatar ? avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&s'} alt="avatar" />
                                                <div>

                                                    <input id="avatar" name="file" type="file" accept="image/*" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm " onChange={handleChangeFile} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>





                    </div>

                </section>
            </main>
        </>
    )
}

export default Register