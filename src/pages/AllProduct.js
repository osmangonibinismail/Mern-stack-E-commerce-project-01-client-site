import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>All Products</h2>
        <button className='border-2 border-lime-500 hover:bg-lime-600 transition-all hover:text-white text-lime-600 py-1 px-3' onClick={() => setOpenUploadProduct(true)}>Upload product</button>
      </div>

      {/* all product */}
      <div className='flex items-center flex-wrap h-[calc(100vh-190px)] overflow-y-scroll gap-5 py-4'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
            )
          })
        }
      </div>

      {/* Upload Product component*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }

    </div>
  )
}

export default AllProduct
