import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import loginIcons from '../assest/sigin.gif'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <section id='login'>
      <div className='container mx-auto p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-md mx-auto '>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>
          {/* <div className=''>

          </div> */}
          <form className='' >
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input type='email' placeholder='Enter email' className='w-full h-full outline-none bg-transparent'></input>
              </div>
            </div>
            <div className=''>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showPassword ? "text" : "password"} placeholder='Enter password' className='w-full h-full outline-none bg-transparent'></input>
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((previous)=> ! previous)}>
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

            <button className='bg-lime-500 text-white px-6 py-2 w-full max-w-[400px] rounded-lg hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Login
