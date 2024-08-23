import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';

const UploadProduct = ({
    onClose
}) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    })
    const [uploadProductImageInput, setUploadProductImage] = useState("")

    const handleOnChange = (e) => {

    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        setUploadProductImage(file.name)
        console.log('file', file)

        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
        console.log("upload Image", uploadImageCloudinary.url)
    }
    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center '>
            <div className='bg-white p-2 rounded w-full max-w-2xl h-full max-h-[75%] overflow-hidden '>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-xl'>
                        Upload Product
                    </h2>
                    <div className='w-fit ml-auto items-center text-2xl hover:text-lime-600 cursor-pointer hover:border-2 hover:border-black border' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
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
                    <select className='p-2 bg-slate-100 border' value={data.category}>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>
                    {/* productImage */}
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2 '>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map(el => {
                                            return (
                                                <img src={el} alt='el' width={80} height={80} className='bg-slate-100 border' />
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className=' text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }

                    </div>

                    <button className=' mb-10 px-3 py-2 bg-lime-500 text-white hover:bg-lime-600'>Upload product</button>
                </form>
            </div>
        </div>
    )
}

export default UploadProduct
