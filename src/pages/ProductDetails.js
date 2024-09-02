import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  console.log("product id", params)

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })

    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }

  console.log("data", data)
  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product image*/}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/* product zoom */}

            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-125'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}
                  >

                  </div>
                </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map(el => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>

                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURl, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURl}>
                          <img src={imgURl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURl)} onCli={() => handleMouseEnterProduct(imgURl)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {/* product details*/}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse rounded-full h-6 lg:h-8 w-full inline-block'></p>
              <h2 className='text-2xl lg:text-3xl font-medium bg-slate-200 animate-pulse h-6  lg:h-8 w-full'></h2>
              <p className='capitalize text-slate-500 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8'></p>
              <div className='text-lime-600 flex gap-1 items-center bg-slate-200 animate-pulse h-6 lg:h-8 w-full'>
              </div>

              <div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                <p className='text-lime-600 bg-slate-200 w-full'></p>
                <p className='text-slate-500 line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8 bg-slate-200 animate-pulse rounded w-full'></button>
                <button className='h-6 lg:h-8 bg-slate-200 animate-pulse rounded w-full'></button>
              </div>
              <div className=' w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 animate-pulse rounded w-full'></p>
                <p className='h-10 lg:h-12 bg-slate-200 animate-pulse rounded w-full'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-lime-200 text-lime-600 rounded-full px-2 inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-3xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-500'>{data?.category}</p>
              <div className='text-lime-600 flex gap-1 items-center'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1'>
                <p className='text-lime-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{displayINRCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 rounded border-lime-600 px-3 py-1 min-w-[120px] text-lime-600 font font-medium hover:bg-lime-600 hover:text-white'>Buy</button>
                <button className='border-2 rounded border-lime-600 px-3 py-1 min-w-[120px] font-medium text-white bg-lime-600 hover:bg-white hover:text-lime-600'>Add to Cart</button>
              </div>
              <div className=''>
                <p className='text-slate-600 font-medium my-1'>Description :</p>
                <p className=''>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
        )
      }



    </div>
  )
}

export default ProductDetails
