import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchData
}) => {

    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-4 rounded-xm shadow-2xl'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center '>
                    <img src={data?.productImage[0]} width={120} height={120} className='object-fill mx-auto h-full' />
                </div>
                <h1 className='mt-2 font-medium text-ellipsis line-clamp-2'>{data?.productName}</h1>
                <p className='font-semibold  mb-2'>
                    {
                        displayINRCurrency(data?.sellingPrice)
                    }
                </p>

                <div className='border-dotted border-gray-500 border-t-2'>



                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer mt-2' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>


            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                )
            }
        </div>
    )
}

export default AdminProductCard
