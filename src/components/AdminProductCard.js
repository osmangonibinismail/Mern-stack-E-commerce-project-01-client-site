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
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <img src={data?.productImage[0]} width={120} height={120} className='w-fit m-auto' />
                <h1 className='mt-2'>{data?.productName}</h1>

                <div className=''>

                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data?.sellingPrice)
                        }
                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
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
