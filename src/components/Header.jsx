import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = () => {
    const [openSidebar, setOpenSidebar] = React.useState(false);

    return (
        <>
            <header className='py-6'>
                <div className="page_width">
                    <div className='flex justify-between'>
                        <div className='cursor-pointer'>
                            <MenuIcon onClick={()=>setOpenSidebar(true)} />
                        </div>
                        <div>
                            <Link to='/'><h1 className='text-xl md:text-[20px] text-center font-black'>BOUBOULENA CREATIVE</h1></Link>
                        </div>
                        <div></div>
                    </div>
                </div>
            </header >
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </>
    )
}

export default Header