import React from 'react'
import Images from "../constant/Images"
import { useState, useEffect } from 'react';

const Client = () => {

    const [images] = useState([
        Images.bodybio_img,
        Images.paradise_img,
        Images.higherdose_img,
        Images.dinners_img,
        Images.wondermed_img,
        Images.wondermed_sciences_img,
        Images.alkemis_img,
    ]);
    const combinedImages = [...images, ...images , ...images , ...images,...images, ...images , ...images , ...images,...images, ...images , ...images , ...images];

    return (
        <>
            <div className="marquee-container">
                <h3 className='text-center text-black'>Clients</h3>
                <div className="marquee">
                    {combinedImages.map((imageSrc, index) => (
                        // <div key={index} className='inline-block sm:w-[70%] lg:w-[48%] xl:w-[31%] w-[15%] cursor-pointer mt-10'>
                        <div key={index} className='inline-block cursor-pointer mt-10 mx-20'>
                            <img className='h-[55px]' src={imageSrc} alt={`Image ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default Client