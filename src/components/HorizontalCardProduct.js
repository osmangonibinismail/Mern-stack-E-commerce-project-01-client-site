import React, { useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const HorizontalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("categoryProduct?.data", categoryProduct.data)
        setData(categoryProduct?.data)

    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='container mx-auto px-4 my-6'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none'>
                <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                {
                    data.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white shadow rounded-sm flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-125 transition-all' />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black'>
                                        {product?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-600'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-lime-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-600 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-lime-500 hover:bg-lime-600 text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>


        </div>
    )
}

export default HorizontalCardProduct
