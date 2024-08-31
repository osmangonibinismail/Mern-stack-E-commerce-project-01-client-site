import React, { useContext, useState } from 'react';
// import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)


  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }

    if (data.error) {
      toast.error(data.message)
    }
  }

  console.log("header add to cart", context)

  return (
    // header section added
    <header className='h-16 shadow-lg bg-white fixed z-40 w-full'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to="/" >
            <span w={90} h={50} className='text-3xl font-bold'>O<a className=''>A</a>I <a className='text-lime-500 '> Mart</a></span>
          </Link>
          {/* <Logo w={100} h={60}/> */}
        </div>
        {/* search button hidden */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search your product...' className='w-full outline-none'></input>
          <div className='text-lg min-w-[50px] h-8 bg-lime-500 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* register icon and cart icon set up */}
        <div className='flex items-center gap-4'>
          <div className='relative  flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-9 h-9 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }


            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                  </nav>
                </div>
              )
            }
          </div>
          {
            user?._id && (
              <div className='text-2xl relative'>
                <FaShoppingCart />
                <div className='bg-lime-500 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                  <span className='text-xs'>{context?.cartProductCount}</span>
                </div>
              </div>
            )
          }


          <div className='' >
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1  bg-lime-500 text-white hover:bg-lime-600'>Logout</button>
              )
                :
                (
                  <Link to="/login" className='px-3 py-1  bg-lime-500 text-white hover:bg-lime-600'>Login</Link>
                )
            }

          </div>
        </div>

        {/*  */}
      </div>
    </header>
  )
}

export default Header
