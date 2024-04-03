import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Layout/Button';

const Login = () => {

    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

    }

    return (
        <>
            <main id="Login">
                <section className="mx-auto w-[80%] my-6 p-4">

                    <h4 className="text-right"> Create a new account ? <Link to={'/register'} className='text-highlight'>Sign Up</Link> </h4>

                    <div className="flex md:flex-row items-stretch w-[100%] ">
                        <div className="left  w-[40%] relative">

                            <img src="./images/signup.jpg" alt="login" width={'100%'} height={'100%'} className='absolute inset-0 w-full h-full object-contain' />
                        </div>

                        <div className="right w-[60%] p-7">

                            <div className="flex items-start justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                                <div className="max-w-md w-full space-y-8">
                                    <div>
                                        <small className="mt-3">Sign in to your account</small>
                                        <h2 className="mt-1 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                                    </div>
                                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                        <input type="hidden" name="remember" value="true" />
                                        <div className="rounded-md shadow-sm -space-y-px">

                                            <div className='mb-5'>
                                                <label htmlFor="email-address"  >Email</label>
                                                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={form.email} onChange={handleChange} />
                                            </div>

                                            <div className='mb-5'>
                                                <label htmlFor="password" >Password</label>
                                                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={form.password} onChange={handleChange} />
                                            </div>
                                        </div>


                                        <div>
                                           <Button type='submit' title={'Sign In'} />
                                        </div>
                                    </form>
                                </div>
                            </div>





                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default Login
