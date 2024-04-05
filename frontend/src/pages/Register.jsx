import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleRegisterUser } from '../../Store/UsersSlice';
import FormInputBox from '../components/Layout/FormInputBox';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Layout/Button';

const Register = () => {

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.user);

    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', cpassword: '', domain: '', gender: 'Male', available: false });
    const [file, setFile] = useState('');
    const [avatar, setAvatarSrc] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleChangeFile = (e) => {
        setFile(e.target.files[0])

        const file = e.target.files[0];
        if (file) {
            setAvatarSrc(URL.createObjectURL(file));
        }
    };

    //---------- Function to submit the form data or can say login the users 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, cpassword } = form;

        if (password !== cpassword) {
            toast.error("Password and confirm password didn't match");
            setForm({ ...form, password: '', cpassword: '' })
            return;
        }

        if (file === undefined || file === null || !file) {
            toast.error("Neccessary to upload profile picture")
            setFile('');
            return;
        }

        const myForm = new FormData();;
        myForm.append('first_name', form.first_name);
        myForm.append('last_name', form.last_name);
        myForm.append('email', form.email);
        myForm.append('gender', form.gender);
        myForm.append('domain', form.domain);
        myForm.append('available', form.available);
        myForm.append('password', form.password);
        myForm.append('cpassword', form.cpassword);
        myForm.append('file', file);

        dispatch(handleRegisterUser(myForm));


        setForm({ first_name: '', last_name: '', email: '', password: '', cpassword: '', domain: '', available: false, gender: '' });
        setAvatarSrc('');
    }

    return (
        <>
            <main id="Register">
                <section className="mx-auto w-[100%] md:w-[80%] my-6 p-4">

                    <h4 className="text-right"> Already have a account? <Link to={'/'} className='text-highlight' >Sign In</Link> </h4>


                    <div className=" w-[100%] p-7">

                        <div className=" bg-gray-50 py-12 px-2 sm:px-6 lg:px-8">
                            <div className="w-full space-y-8">
                                <div>
                                    <small className="mt-3">Sign Up To Heliverse</small>
                                    <h2 className="mt-1 text-3xl font-extrabold text-gray-900">Welcome ! Let's Create  <span className='text-highlight' > Profile</span></h2>
                                </div>
                                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                    <div className="rounded-md shadow-sm -space-y-px">

                                        <div className="flex flex-wrap justify-between">

                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">

<FormInputBox label={'First Name'} name={'first_name'} handleChange={handleChange} value={form.first_name} placeholder={'John'}  />
                                            </div>


                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
<FormInputBox label={'Last Name'} name={'last_name'} handleChange={handleChange} value={form.last_name} placeholder={'Doe'}  />
                                        </div>
                                        </div>

 <FormInputBox label={'Email'} name={'email'} handleChange={handleChange} value={form.email} placeholder={'johndoe23@gmail.com'} maxL={120} minL={5} type='email'   />                                    

                                        <div className="flex flex-wrap justify-between mt-4">
                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">

                                            <FormInputBox label={'password'}
                                            name={'password'} handleChange={handleChange} value={form.password} minL={8} maxL={120} placeholder={'************'} type={'password'} />                                              
                                               
                                            </div>

                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                            <FormInputBox label={'Confirm Password'}
                                            name={'cpassword'} handleChange={handleChange} value={form.cpassword} minL={8} maxL={120} placeholder={'************'} type={'password'} />

                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full md:w-1/2 md:pr-2 mb-4">
                                                <label htmlFor="gender" className="">Gender</label>
                                                <select id="gender" name="gender" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" value={form.gender} onChange={handleChange}>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="w-full md:w-1/2 md:pl-2 mb-4">
                                                <FormInputBox label={'domain'} name={'domain'} minL={2} handleChange={handleChange} value={form.domain} placeholder={'Sales, Software etc.'} />
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

                                            <div className="w-full md:w-1/2 md:pr-2 mb-4 flex items-center justify-around md:justify-center ">
                                                <img className="md:w-30 mx-2 w-[20%]  h-25 rounded-full" src={avatar ? avatar : 'https://via.placeholder.com/50'} alt="avatar" />
                                                <div>

                                                    <FormInputBox type='file' name={'file'} placeholder={''} handleChange={handleChangeFile} label={'Chose Profile'} />

                                                    {/* <input id="avatar" name="file" type="file" accept="image/*" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm " onChange={handleChangeFile} /> */}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <Button title={'Sign Up'} type='submit' loading={loading} />
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