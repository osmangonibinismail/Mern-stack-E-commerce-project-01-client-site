import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginIcons from '../assest/signin.gif';
import { Link } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            console.log("summaryApi.signup.url", SummaryApi.signUp.url)
            const dataResponse = await fetch('http://localhost:8080/api/signup', {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            console.log("data", dataApi)
        } else {
            console.log("Please check password and confirm password")
        }
    }
    console.log('data login', data)
    return (
        <section id='signup'>
            <div className='container mx-auto p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto '>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div className=''>
                            <img src={data?.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form className=''>
                            <label>
                                <div className='text-xs bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full bg-opacity-80'>
                                    upload photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>

                        </form>
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    required
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    required
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>
                        <div className=''>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    name='password'
                                    required
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                ></input>
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((previous) => !previous)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <label>Confirm password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter confirm password'
                                    name='confirmPassword'
                                    required
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                ></input>
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((previous) => !previous)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 w-full max-w-[400px] rounded-lg hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
                    </form>
                    <p className='my-5'>Already have an account? please <Link to={"/login"} className='text-lime-600 hover:text-lime-700 font-semibold hover:underline'>Log in</Link></p>

                </div>
            </div>
        </section>
    )
}

export default SignUp;
