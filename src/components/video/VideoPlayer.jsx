import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, disableFullScreen ,autoplay, controls }) => {
    const playerRef = useRef();
    // const isVimeoUrl = url.includes('vimeo.com');
    // if (isVimeoUrl) {
    //     return <div>This is a Vimeo video. Please use Vimeo's embed code to play it.</div>;
    // }

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            controls={controls}
            className="react-player cursor-pointer"
            muted={disableFullScreen}
            playsinline={true}
            playing={autoplay}
            preload="auto"
            pip={false}
            loop={disableFullScreen}
            // light={'https://i.vimeocdn.com/video/1660362500-217ef9c26062e8ce9834d87fbc0e1fa4f8981990aa066aa1bfe052ba13b6a7a8-d?mw=1700&mh=956'}
            config={{
                vimeo: {
                    autoplay: true,
                    playsinline: true,
                },
                file: {
                    attributes: {
                        disablePictureInPicture: disableFullScreen,
                        playsInline: true,
                        controlsList: disableFullScreen ? 'nodownload nofullscreen noplaybackrate pip ' : 'nodownload'
                    }
                }
            }}
        />
    );
};

export default VideoPlayer;
