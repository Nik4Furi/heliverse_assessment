import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Layout/Button';
import FormInputBox from '../components/Layout/FormInputBox';

import {toast} from 'react-hot-toast'

import { useSelector, useDispatch } from 'react-redux'
import { handleUpdateUser } from '../../Store/UsersSlice';

const Profile = ({ user }) => {

    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [form, setForm] = useState({ first_name: user?.first_name || '', last_name: user?.last_name || '', email: user?.email || '', domain: user?.domain || '', gender: user?.gender || '', available: user?.available || false });
    const [file, setFile] = useState('');
    const [avatar, setAvatarSrc] = useState(user?.avatar || '')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleChangeFile = (e) => {
        setFile(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            setAvatarSrc(URL.createObjectURL(file));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {};
        let cnt = 0;

        if(form?.first_name != user?.first_name) formData.first_name = form?.first_name,cnt++;
        if(form?.last_name != user?.last_name) formData.last_name = form?.last_name,cnt++;
        if(form?.gender != user?.gender) formData.gender = form?.gender,cnt++;
        if(form?.domain != user?.domain) formData.domain = form?.domain,cnt++;
        if(form?.available != user?.available) formData.available = form?.available,cnt++;
        if(avatar != user?.avatar) formData.file = file,cnt++;

        if(cnt == 0 || !formData || formData === undefined || formData === null){
            toast.error("No update is occured")
            return;
        }

        //--------------- create the form data
        const myForm = new FormData();
             myForm.append('first_name', formData?.first_name);
        myForm.append('last_name', formData?.last_name);
        myForm.append('gender', formData?.gender);
        myForm.append('domain', formData?.domain);
        myForm.append('available', formData?.available);
        myForm.append('file', formData?.file);
        
        //-----------update profile
        dispatch(handleUpdateUser(formData));

    }

    return (
        <>
            <main id="Profile">
                <section className="mx-auto w-[100%] md:w-[80%] my-6 p-4">

                    <div className=" w-[100%]">

                        <div className=" bg-gray-50 py-12 px-2 sm:px-6 lg:px-8">
                            <div className="w-full space-y-2">
                                <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Welcome ! Let's Update Your <span className='text-highlight'>Profile</span> </h2>
                                <p className='text-center text-xs mt-0' >Making some changes to improve your profile</p>

                                <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                                    <div className="rounded-md shadow-sm -space-y-px">

                                        <div className="flex flex-wrap justify-between">

                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">

                                                <FormInputBox required={false} label={'First Name'} name={'first_name'} handleChange={handleChange} value={form.first_name} placeholder={'John'} />
                                            </div>


                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <FormInputBox required={false} label={'Last Name'} name={'last_name'} handleChange={handleChange} value={form.last_name} placeholder={'Doe'} />
                                            </div>
                                        </div>

                                        <FormInputBox required={false} label={'Email'} name={'email'} value={form.email} placeholder={'johndoe23@gmail.com'} type='email' readOnly={true} />


                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">
                                                <label htmlFor="gender" className="">Gender</label>
                                                <select id="gender" name="gender" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={form.gender} onChange={handleChange}>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <FormInputBox label={'domain'} name={'domain'} minL={2} required={false} handleChange={handleChange} value={form.domain} placeholder={'Sales, Software etc.'} />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between items-center">
                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <label htmlFor="available" className="">Available</label>
                                                <select id="available" name="available"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={form.available} onChange={handleChange}>
                                                    <option value="true">Available</option>
                                                    <option value="false">Not Available</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-1/2 md:pr-2 mb-4 flex items-center md:justify-center justify-between">
                                                <img className=" w-[20%] h-25 rounded-full" src={avatar ? avatar : 'https://via.placeholder.com/50'} alt="avatar" />
                                                <div>

                                                    <FormInputBox required={false} type='file' name={'file'} placeholder={''} handleChange={handleChangeFile} label={'Chose Profile'} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <Button title={'Update Profile'} type='submit' loading={loading} />
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

export default Profile