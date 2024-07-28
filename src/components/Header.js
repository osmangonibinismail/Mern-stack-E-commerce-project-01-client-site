import React from 'react';
// import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    // header section added
    <header className='h-16 shadow-lg bg-white'>
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
          <div className='text-3xl cursor-pointer'>
            <FaRegCircleUser />
          </div>
          <div className='text-2xl relative'>
            <FaShoppingCart />
            <div className='bg-lime-500 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
              <span className='text-xs'>0</span>
            </div>
          </div>

          <div className='' >
            <Link to="/login" className='px-3 py-1 rounded-xl bg-lime-500 text-white hover:bg-lime-600'>Login</Link>
          </div>
        </div>

        {/*  */}
      </div>
    </header>
  )
}

export default Header
