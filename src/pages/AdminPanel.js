import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)

    return (
        <div className='min-h-[calc(100vh-120px)] flex'>
            <aside className='bg-white min-h-full  w-full max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-4xl cursor-pointer relative flex justify-center' >
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className=' text-sm'>{user?.role}</p>
                </div>
                {/* navigation */}
                <div className=''>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"products"} className='px-2 py-1 hover:bg-slate-100'>product</Link>
                    </nav>
                </div>
            </aside>

            <main>
                main
            </main>
        </div>
    )
}

export default AdminPanel
