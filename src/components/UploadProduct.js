import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";

const UploadProduct = ({
    onClose
}) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: "",
        description: "",
        price: "",
        selling: ""
    })

    const handleOnChange = (e) => {

    }
    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-2 rounded w-full max-w-2xl h-full max-h-[75%]'>
                <div className='flex justify-between'>
                    <h2 className='font-bold text-xl'>
                        Upload Product
                    </h2>
                    <div className='w-fit ml-auto items-center text-2xl hover:text-lime-600 cursor-pointer hover:border-2 hover:border-black border' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2'>
                    {/* Product Name */}
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter product name'
                        value={data.productName}
                        name='productName'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border'
                    />
                    {/* Brand Name */}
                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='Enter brand name'
                        value={data.brandName}
                        name='brandName'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border'
                    />
                    {/* category */}
                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select className='p-2 bg-slate-100 border' value={data.category}></select>
                </form>
            </div>
        </div>
    )
}

export default UploadProduct
