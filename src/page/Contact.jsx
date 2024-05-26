import React, { useState } from 'react'
import { useContactDetailsMutation } from '../store/service/ContactService'
import { useNavigate } from 'react-router-dom'


const Contact = () => {
    const navigate = useNavigate()
    const [contactData] = useContactDetailsMutation()
    const [inputDetail, setInputDetails] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputDetails((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await contactData(inputDetail)
            if (result?.data?.data) {
                console.log(result?.data?.data)
                alert("form submit successfully")
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='pt-8 pb-10 bg-black-900 flex items-center h-screen'>
            <div className='container page_width text-white max-w-[700px] w-full mx-auto'>
                <h3 className='text-center pb-10'>Let us know what you need and we will be in touch shortly!</h3>
                <form onSubmit={onSubmit} action="submit.php" method="post">
                    <div className='mb-2'>
                        <label htmlFor="name"></label>
                        <input onChange={handleChange} className='w-full my-2 py-4 px-4 rounded-md placeholder:text-black-900 text-black outline-none text-black-900' id="name" name='name' placeholder="Name" type="text" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email"></label>
                        <input onChange={handleChange} className='w-full my-2 py-4 px-4 rounded-md placeholder:text-black-900 text-black outline-none text-black-900' id="email" name='email' placeholder="Email" type="email" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="message"></label>
                        <textarea onChange={handleChange} className='w-full my-2 py-4 px-4 rounded-md placeholder:text-black-900 text-black outline-none text-black-900' id="message" name='message' placeholder="Message" rows="4" ></textarea>
                    </div>
                    <div className='text-center mt-10'>
                        <button className='border px-10 py-2 rounded-md placeholder:text-black-900 text-black outline-none' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact