import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from './VideoPlayer';
import { useSelector } from 'react-redux';


const Video_cart = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [urls, setUrl] = useState('');
    const navigate = useNavigate()
    const getVideoCategorys = useSelector((state) => state.video.videoData);
    console.log(getVideoCategorys, 'tinku')

    const handleVideoPlay = (url) => {
        navigate(`/video_player/${encodeURIComponent(url)}`);
    };

    const handleMouseEnter = (url) => {
        setUrl(url);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (item.type == 'hrz') {
        return (
            <>  {!item ? <div>
                <Skeleton variant='rectangular' className='w-full h-[200px]' sx={{ bgcolor: "#ebebeb", height: "200px", width: "100%" }}></Skeleton>
                <Skeleton variant='text' className='' sx={{ bgcolor: "#ebebeb", paddingTop: "10px", width: '85%' }}></Skeleton>
            </div> : null}
                {/* <div className='cursor-pointer video_cart min-w-[311px] max-w-[311px] relative' onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter(item.url)} onClick={() => handleVideoPlay(item.url)}> */}
                <div className='cursor-pointer video_cart relative' onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter(item.url)} onClick={() => handleVideoPlay(item.url)}>
                    <div onClick={() => handleVideoPlay(item.url)} className='overflow_full'></div>
                    <div>
                        {isHovered ? (
                            <div className='w-full h-[200px]'>
                                <VideoPlayer url={urls} disableFullScreen={true} autoplay={true} controls={false} />
                            </div>
                        ) : (
                            <img className='rounded-lg h-[200px] w-full object-cover' src={item.p_image} alt="cover photo" />
                        )}

                    </div>
                    {getVideoCategorys?.titles ? <div className='flex gap-3 pt-3'>
                        <div className='text-white'>
                            <span className='text-gray-900'>{item.p_name}</span><br />
                            <span className='text-gray-900'>{item.view}</span>
                        </div>
                    </div> : null}
                </div>

            </>
        )
    } else if (item.type == 'vrt') {
        return (
            <>
                {/* <div className='cursor-pointer min-w-[290px] max-w-[290px]' onMouseEnter={() => handleMouseEnter(item.url)} onMouseLeave={handleMouseLeave}> */}
                <div className='cursor-pointer' onMouseEnter={() => handleMouseEnter(item.url)} onMouseLeave={handleMouseLeave}>
                    <div>
                        {isHovered ? (
                            <div className='h-[410px] w-full short_video'>
                                <VideoPlayer url={urls} disableFullScreen={true} autoplay={true} controls={true} />
                            </div>
                        ) : (
                            <img className='rounded-lg h-[410px] w-auto object-cover cover_img' src={item?.p_image} alt="" />
                        )}

                    </div>
                    {getVideoCategorys?.titles ? <div className='flex gap-3 pt-3'>
                        <div className='text-white'>
                            <h2 className='text-gray-900'>{item?.p_desc}</h2>
                            <span className='text-gray-900'>{item?.view}</span>
                        </div>
                    </div> : null}
                </div>
            </>
        )
    }
}

export default Video_cart