import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>All Products</h2>
        <button className='border-2 border-lime-500 hover:bg-lime-600 transition-all hover:text-white text-lime-600 py-1 px-3' onClick={()=>setOpenUploadProduct(true)}>Upload product</button>
      </div>

      {/* Upload Product component*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
        )
      }

    </div>
  )
}

export default AllProduct
