import React, { useEffect, useState } from 'react'
import img1 from '../assest/banner/test1.webp'
import img2 from '../assest/banner/img2.webp'
import img3 from '../assest/banner/img3.jpg'
import img4 from '../assest/banner/img4.jpg'
import img5 from '../assest/banner/img5.webp'

import imgMobile1 from '../assest/banner/img1_mobile.jpg'
import imgMobile2 from '../assest/banner/img2_mobile.webp'
import imgMobile3 from '../assest/banner/img3_mobile.jpg'
import imgMobile4 from '../assest/banner/img4_mobile.jpg'
import imgMobile5 from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        img1,
        img2,
        img3,
        img4,
        img5
    ]
    const mobileImages = [
        imgMobile1,
        imgMobile2,
        imgMobile3,
        imgMobile4,
        imgMobile5
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }
    const preveImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='w-full h-56 md:h-72 bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex hidden items-center'>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                {/* tablet and laptop version */}

                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageURl, index) => {
                            return (
                                <div className=' min-w-full min-h-full w-full h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURl} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
                {/* mobile version */}

                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageURl, index) => {
                            return (
                                <div className=' min-w-full min-h-full w-full h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURl} className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
