import React, { useContext, useState } from 'react';
// import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("search")
    }
  }

  return (
    // header section added
    <header className='h-16 shadow-lg bg-white fixed z-40 w-full'>
      <div className='h-full container mx-auto flex items-center pl-1 lg:pl-4 md:pl-4 pr-2 lg:pr-4 md:pr-4 justify-between'>
        <div className=''>
          <Link to="/" >
            <span w={90} h={50} className='text-3xl lg:text-4xl md:text-4xl font-extrabold lg:font-bold md:font-bold'>OAI <a className='text-lime-500 '> Mart</a></span>
          </Link>
          {/* <Logo w={100} h={60}/> */}
        </div>
        {/* search button hidden */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search your product...' className='w-full outline-none' onChange={handleSearch} value={search}></input>
          <div className='text-lg min-w-[50px] h-8 bg-lime-500 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* register icon and cart icon set up */}
        <div className='flex items-center gap-4 lg:gap-6 md:gap-6'>
          <div className='relative  flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-8 h-8 md:w-9 md:h-9 rounded-full' alt={user?.name} />
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

                    <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Order</Link>
                  </nav>
                </div>
              )
            }
          </div>
          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <FaShoppingCart />
                <div className='bg-lime-500 text-white w-5 h-5  p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                  <span className='text-xs'>{context?.cartProductCount}</span>
                </div>
              </Link >
            )
          }


          <div className='' >
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1  bg-lime-500 text-white hover:bg-lime-600'>Logout</button>
              )
                :
                (
                  <Link to="/login" className='px-4 py-2 text-medium  bg-lime-500 text-white hover:bg-lime-600'>Login</Link>
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
