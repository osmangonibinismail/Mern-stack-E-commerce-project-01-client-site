import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import loginIcons from '../assest/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const { fetchUserDetails } = useContext(Context)


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
    }
    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }
  console.log('data login', data)

  return (
    <section id='login'>
      <div className='container mx-auto p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto '>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>
          {/* <div className=''>

          </div> */}
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
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
              <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-lime-500">
                Forget password ?
              </Link>
            </div>

            <button className='bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 w-full max-w-[400px] rounded-lg hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>
          <p className='my-5'>Don't have account? please <Link to={"/sign-up"} className='text-lime-600 hover:text-lime-700 font-semibold hover:underline'>Sign up</Link></p>

        </div>
      </div>
    </section>
  )
}

export default Login
