// ShowMoreButton.js
import React from 'react';

const ShowMoreButton = ({  onClick }) => {
    return (
        <>
                <div className='text-center my-10 flex items-center'>
                    <span className='text-white w-[40%] bg-white h-[1px] justify-center'></span>
                    <button onClick={onClick} className="text-white bg-blue-500 py-2 rounded-full border w-[20%]">
                        show more
                    </button>
                    <span className='text-white w-[40%] bg-white h-[1px]'></span>
                </div>
        </>
    );
}

export default ShowMoreButton;
