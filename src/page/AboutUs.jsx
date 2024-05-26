import React from 'react'
import Images from '../constant/Images'

const AboutUs = () => {
    return (
        <>
            <div className='about_us about_section'>
                <div className="container page_width about_container ">
                    <h1 className='about_heading'>About</h1>
                </div>
            </div>

            {/* BOUBOULENAText */}

            <section>
                <div className='container page_width creative_text'>
                    <p className='text-xl text-center'>Bouboulena Creative creates scaleable customized commercial video content.</p>
                    <p className='text-xl text-center '> Bringing expertise in professional equipment including lighting, audio recording,drone,& cameras crafting engaging visuals.</p>

                </div>


                <div className='container page_width '>


                    <h1 className='mt-6 x-lg-0'><u>Services</u></h1>
                    <div className="grid grid-cols-3 sm:grid-cols-1  pt-lg-8 pt-3">
                        <div >
                            <ul className='ps-lg-5 text-xl'>
                                <li className='text-xl pb-2 list-disc'>Advertisments</li>
                                <li className='pb-2 list-disc' >Founder Ads</li>
                                <li className='pb-2 list-disc' >vergreen Ads</li>
                                <li className='pb-2 list-disc'>Sles Ads</li>
                                <li className='pb-2 list-disc' >estimonial Ads</li>
                                <li className='pb-2 list-disc' >roblem | Solutions Ads</li>
                            </ul>
                        </div>
                        <div>

                            <ul className='text-xl'>
                                <li className='pb-2 list-disc' >Custom A.I. Avators</li>
                                <li className='pb-2 list-disc' >Motion graphics</li>
                                <li className='pb-2 list-disc' >Script Writing</li>
                                <li className='pb-2 list-disc'  >Coneptulization</li>
                                <li className='pb-2 list-disc' >Color correction</li>
                            </ul>
                        </div>

                        <div>

                            <ul className='text-xl'>
                                <li className='pb-2 list-disc' >Event Video Recaps
                                </li>
                                <li className='pb-2 list-disc' >Educational / Tutorials
                                </li>
                                <li className='pb-2 list-disc' >Testimonials</li>
                                <li className='pb-2 list-disc' >Branded Content</li>
                                <li className='pb-2 list-disc' >Testimonials</li>
                            </ul>
                        </div>



                    </div>


                </div>
                <div className="container page_width">
                    <div className="equipment_heading">
                        <h1><u>Equipment</u></h1>
                    </div>
                    <div className='equipment_box grid grid-cols-3 sm:grid-cols-2 pt-lg-8'>
                        <div>
                            <ul className='text-xl'><li className='pb-2 list-disc' >Commercial Cameras</li>
                                <li className='pb-2 list-disc' >Stabilizers</li>
                                <li className='pb-2 list-disc' >Commerical Lighting</li></ul>
                        </div>
                        <div>
                            <ul className='text-xl'><li className='pb-2 list-disc'>rone</li>
                                <li className='pb-2 list-disc' >Green Screen</li>
                                <li className='pb-2 list-disc'>tudio</li></ul>
                        </div>
                    </div>

                </div>


            </section>

            <section className='founder_section'>
                <div className='container page_width'>
                    <div className="founder_heading">
                        <h1><u>Founder</u></h1>

                        <p className='text-xl krystina'>Bouboulena | krystina athanasiadis</p>
                    </div>
                    <div className=" sm:columns-1 lg:columns-1 columns-2 about_layout gap-5 ">
                        <div className='pt-8'>
                            <img src={Images.owner_img} alt="owner_image" />
                        </div>
                        <div className='text-center pt-8'>
                            <p className=' text-white text-xl  '>With a decade of expertise in crafting visually stunning and engaging content, I am a seasoned professional in the world of video production and editing. Over the past three years, I have had the privilege of working with HigherDOSE, where I play a pivotal role in creating their editorial and video advertisements. My work has been instrumental in driving their company's impressive growth, with my ads consistently performing at the highest level.</p>
                            <p className=' text-white pt-10 text-xl  '>As a highly skilled video producer, I specialize in creating captivating video advertisements that grab attention and convert. Additionally, I am well-versed in creating visually appealing editorial content that  can be customized to each brand's aesthetic. Whether you need a big or small project, I am fully equipped to handle it. I have a team at my disposal for larger projects and for smaller budgets, I can deliver it efficiently with just me.</p>
                            <p className=' text-white pt-10 text-xl '>I bring to the table a wealth of templates and formats that are known to work, and I also possess the ability to create customized content, including branded fonts, colors, and motion graphics. Let's create a visually stunning piece of content that resonates with your target audience and drives results. I am now looking to expand my client base and take on new projects.</p>
                        </div>
                    </div>
                    {/* <div>
                        <h1 className='text-white pt-8 mt-8'><u>Request  a  consultation</u></h1>
                    </div> */}
                </div>
            </section>



        </>
    )
}

export default AboutUs