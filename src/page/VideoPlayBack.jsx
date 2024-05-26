import React, { useEffect, useState, } from 'react';
import videoListData from '../constant/jsxData/VideoListData';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoList } from '../store/slice/VideoSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/video/VideoPlayer';
import { useSingleVideoDataQuery } from '../store/service/HomeService';

const VideoPlayback = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [videoUrl, setVideoUrl] = useState('');
    const { data: getVideoCategory, isError, isLoading } = useSingleVideoDataQuery();
    const getVideoCategorys = useSelector((state) => state.video.videoList);


    useEffect(() => {
        dispatch(setVideoList(getVideoCategory));
    }, [dispatch, getVideoCategory]);

    // const handleVideoPlay = (videoUrl) => {
    //     const newSearchParams = new URLSearchParams(location.search);
    //     newSearchParams.set('videoUrl', videoUrl);
    //     window.history.replaceState(null, null, `${window.location.pathname}?${newSearchParams.toString()}`);
    //     setVideoUrl(videoUrl);
    // };

    const handleVideoPlay = (videoUrl) => {
        setVideoUrl(videoUrl)
        navigate(`/video_player/${encodeURIComponent(videoUrl)}`);
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log(getVideoCategorys?.data)
        const urlParam = searchParams.get('videoUrl');
        if (urlParam) {
            setVideoUrl(urlParam);
            console.log(videoUrl, "videoUrl")
        } else {
            setVideoUrl(params.id);
        }
    }, []);
    var i = 0;
    return (
        <>
            <div className='video_play_back pb-10'>
                <div className="page_width">
                    <div className='flex gap-10 items-start video_container_parent'>
                        <div className='w-[70%] h-[638px] video_contaier '>
                            <div className='single_video_play h-full'>
                                <VideoPlayer url={videoUrl}  controls={true} />
                            </div>
                            {
                                getVideoCategorys?.data?.map((item, index) => {
                                    if (item.type == 'hrz') {
                                        if (params.id == item.url) {
                                            return (
                                                <div className='mt-2 title_video text-white'>
                                                    <h3>{item.p_name}</h3>
                                                    <span className='text-gray-900'>{item.cat_name}</span>
                                                </div>
                                            )
                                        } else {
                                            null
                                        }
                                    }
                                })
                            }
                        </div>
                        <div className='w-[30%] video_contaier_related'>
                            <div className='flex flex-col gap-3 mb-3'>

                                {isLoading ? <p className='text-white'>Lodading...</p> : null}
                                {
                                    getVideoCategorys?.data?.map((item, index) => (
                                        <div key={index} className='flex gap-3 cursor-pointer' onClick={() => handleVideoPlay(item.url)}>
                                            <img className='rounded-lg w-[168px] min-w-[168px] h-[96px]' src={item.p_image} alt="" />
                                            <div>
                                                <h2>{item.songName}</h2>
                                                <span className='text-gray-900'>{item.p_name}</span><br />
                                                <span className='text-gray-900'>{item.cat_name}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoPlayback;
