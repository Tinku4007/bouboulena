import React, { useEffect, useState } from 'react';
import Client from '../components/Client';
import WithHomeLayout from '../hoc/WithHomeLayout';
import Video_cart from '../components/video/Video_cart';
import { useGetDataQuery, usePartnerSectionQuery } from '../store/service/HomeService';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoData } from '../store/slice/VideoSlice';
import ShowMoreButton from '../components/ShowMoreButton';
import { Skeleton, Typography } from '@mui/material';
// import styles from './Home.module.css'; // Import CSS module

const Home = () => {
  const { data: getVideoCategory, isError, isLoading } = useGetDataQuery();
  const dispatch = useDispatch();
  const getVideoCategorys = useSelector((state) => state.video.videoData);
  const { data: heroSection, isLoading: heroSectionLoading } = usePartnerSectionQuery();
  const [displayedItems, setDisplayedItems] = useState({});

  const getItemsCountBasedOnBreakpoint = () => {
    const width = window.innerWidth;
    if (width <= 500) {
      return { hrz: 1, vrt: 2 };
    } else if (width <= 599) {
      return { hrz: 1, vrt: 2 };
    }
    else if (width <= 664) {
      return { hrz: 2, vrt: 2 };
    } else if (width <= 913) {
      return { hrz: 2, vrt: 3 };
    } else if (width <= 999) {
      return { hrz: 2, vrt: 4 };
    } else if (width <= 1145) {
      return { hrz: 3, vrt: 4 };
    } else if (width <= 1300) {
      return { hrz: 3, vrt: 5 };
    } else if (width <= 1350) {
      return { hrz: 3, vrt: 6 };
    } else if (width <= 1662) {
      return { hrz: 4, vrt: 6 };
    } else {
      return { hrz: 4, vrt: 7 };
    }
  };

  useEffect(() => {
    const updateDisplayedItems = () => {
      if (getVideoCategorys) {
        const categories = Object.keys(getVideoCategory?.data || {});
        const initialDisplayedItems = categories.reduce((acc, category) => {
          const itemsCount = getItemsCountBasedOnBreakpoint();
          acc[category] = { hrz: itemsCount.hrz, vrt: itemsCount.vrt };
          return acc;
        }, {});
        setDisplayedItems(initialDisplayedItems);
      }
    };

    updateDisplayedItems(); // Set initial displayed items
    window.addEventListener('resize', updateDisplayedItems); // Update on resize

    return () => {
      window.removeEventListener('resize', updateDisplayedItems); // Cleanup on unmount
    };
  }, [getVideoCategorys]);

  useEffect(() => {
    if (getVideoCategory) {
      dispatch(setVideoData(getVideoCategory));
    }
  }, [getVideoCategory, dispatch]);

  const handleShowMore = (category, type) => {
    setDisplayedItems(prevCounts => {
      const newDisplayedItems = { ...prevCounts };
      newDisplayedItems[category][type] += 7;
      return newDisplayedItems;
    });
  };

  const getDisplayedItems = (category, type) => {
    return Math.min(
      displayedItems[category]?.[type] || 0,
      getVideoCategorys?.data?.[category][0].content?.filter(video => video.type === type)?.length || 0
    );
  };

  const getSubDisplayedItems = (category, type) => {
    return Math.min(
      displayedItems[category]?.[type] || 0,
      getVideoCategorys?.data?.[category][0].content[0].content?.filter(video => video.type === type)?.length || 0
    );
  };
  return (
    <>
      <section className='hero_section'>
        <div className='text-center'>
          {heroSection?.data?.map((item, index) => (
            <div key={index}>
              <div className='w-full h-full relative video-background'>
                <iframe
                  src={`${item.background_content}?h=3f73183a26&background=1&autoplay=1&loop=1&muted=1&controls=0`}
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Background Video"
                ></iframe>
              </div>
              <div className='hero-content'>
                <h1 className='text-white'>{item.heading}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='py-12'>
        <Client />
      </section>

      <section className='bg-black-900 py-8'>
        <div className="page_width">
          {isLoading && (
            <>
              <div className='category_center pb-4'>
                <Skeleton
                  variant='text'
                  animation='wave'
                  sx={{ bgcolor: "#ebebeb", paddingTop: "10px", width: '20%', height: "100px" }}
                />
              </div>
              <div className='layout_videos'>
                {[...Array(40)].map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      variant='rectangular'
                      animation='wave'
                      sx={{ bgcolor: "#ebebeb", height: "200px", width: "100%" }}
                    />
                    <Skeleton
                      variant='text'
                      animation='wave'
                      sx={{ bgcolor: "#ebebeb", paddingTop: "10px", width: '85%' }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {isError && (
            <Typography variant="h6" color="error" className='text-center'>
              Failed to load videos. Please try again later.
            </Typography>
          )}

          {!isLoading && !isError && getVideoCategorys?.data && Object.keys(getVideoCategorys?.data).filter(category => {
            return getVideoCategorys?.data[category].some(item => item.count > 0);
          }).map(category => (
            <div key={category}>
              <div id={category} className='category_center'>
                <h1 className='text-white mt-10 border-b inline-block'>{category}</h1>
              </div>
              <div>
                {getVideoCategorys?.data[category]?.map((isParent, parentIndex) => {
                  if (isParent?.is_parent == 1) {

                    return (
                      <div key={parentIndex}>
                        {isParent?.content?.map((Sub_Cat, subIndex) => {

                          return (
                            <div key={subIndex}> {/* Use subIndex as the key */}
                              <div id={Sub_Cat.cat_name} className='category_center'>
                                <h3 className='text-white mt-10 border-b inline-block'>{Sub_Cat.cat_name}</h3>
                              </div>
                              <div className='pt-8 layout_video layout_videos'>
                                {/* {Sub_Cat?.content?.filter(video => video.type === 'hrz')?.map((item, hrzIndex) => {
                                  return (
                                    <Video_cart key={hrzIndex} item={item} />
                                  )
                                })} */}
                                {Sub_Cat?.content?.filter(video => video.type === 'hrz')?.slice(0, getSubDisplayedItems(category, 'hrz')).map((item, hrzIndex) => (
                                  <Video_cart key={hrzIndex} item={item} />
                                ))}
                              </div>
                              {getSubDisplayedItems(category, 'hrz') < getVideoCategorys?.data[category][parentIndex].content[subIndex].content?.filter(video => video.type === 'hrz')?.length && (
                                <ShowMoreButton
                                  label="Show More"
                                  totalItems={getVideoCategorys?.data[category][parentIndex].content[subIndex].content?.filter(video => video.type === 'hrz')?.length}
                                  displayedItems={getSubDisplayedItems(category, 'hrz')}
                                  onClick={() => handleShowMore(category, 'hrz')}
                                />
                              )}
                              <div className='pt-8 layout_videos_Short'>
                                {Sub_Cat?.content?.filter(video => video.type === 'vrt')?.slice(0, getSubDisplayedItems(category, 'vrt')).map((item, vrtIndex) => (
                                  <Video_cart key={vrtIndex} item={item} />
                                ))}
                              </div>
                              {getSubDisplayedItems(category, 'vrt') < getVideoCategorys?.data[category][parentIndex].content[subIndex].content?.filter(video => video.type === 'vrt')?.length && (
                                <ShowMoreButton
                                  label="Show More"
                                  totalItems={getVideoCategorys?.data[category][parentIndex].content[subIndex].content?.filter(video => video.type === 'vrt')?.length}
                                  displayedItems={getSubDisplayedItems(category, 'vrt')}
                                  onClick={() => handleShowMore(category, 'vrt')}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  } else {
                    return (
                      <div key={parentIndex}>
                        <div className='pt-8 layout_video layout_videos'>
                          {isParent?.content?.filter(video => video.type === 'hrz')?.slice(0, getDisplayedItems(category, 'hrz')).map((item, hrzIndex) => (
                            <Video_cart key={hrzIndex} item={item} />
                          ))}
                        </div>
                        {getDisplayedItems(category, 'hrz') < getVideoCategorys?.data[category][0].content?.filter(video => video.type === 'hrz')?.length && (
                          <ShowMoreButton
                            label="Show More"
                            totalItems={getVideoCategorys?.data[category][0].content?.filter(video => video.type === 'hrz')?.length}
                            displayedItems={getDisplayedItems(category, 'hrz')}
                            onClick={() => handleShowMore(category, 'hrz')}
                          />
                        )}
                        <div className='pt-8 layout_videos_Short'>
                          {isParent?.content?.filter(video => video.type === 'vrt')?.slice(0, getDisplayedItems(category, 'vrt')).map((item, vrtIndex) => (
                            <Video_cart key={vrtIndex} item={item} />
                          ))}
                        </div>
                        {getDisplayedItems(category, 'vrt') < getVideoCategorys?.data[category][0].content?.filter(video => video.type === 'vrt')?.length && (
                          <ShowMoreButton
                            label="Show More"
                            totalItems={getVideoCategorys?.data[category][0].content?.filter(video => video.type === 'vrt')?.length}
                            displayedItems={getDisplayedItems(category, 'vrt')}
                            onClick={() => handleShowMore(category, 'vrt')}
                          />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}

          {!isLoading && !isError && (!getVideoCategorys?.data || Object.keys(getVideoCategorys?.data).length === 0) && (
            <Typography variant="h6" className='text-center text-white'>
              No videos available.
            </Typography>
          )}
        </div>
      </section>
    </>
  );
};

export default WithHomeLayout(Home);
