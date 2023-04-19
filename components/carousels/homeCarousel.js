import React, { useState } from 'react'
import LinkBtn from '../buttons/link_btn';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

import Image from 'next/image';
import image1 from '../../public/carousel imgs/carousel img1.jpg'
import image2 from '../../public/carousel imgs/carousel img2.jpg'
import image3 from '../../public/carousel imgs/carousel img3.jpg'
import image4 from '../../public/carousel imgs/carousel img4.jpg'
import image5 from '../../public/carousel imgs/carousel img5.jpg'
import image6 from '../../public/carousel imgs/carousel img6.jpg'

export default function HomeCarousel(props) {
    const [play, setPlay] = useState(true)
    const togglePlay = () => {
        if (play === true) return setPlay(false)
        if (play === false) return setPlay(true)
    }
    return (
        <Splide fixed className="w-full h-full relative transition-all duration-1000" hasTrack={false}
            options={{
                type: 'loop',
                fixedWidth: '100vw',
                fixedHeight: '100vh',
                speed: 700,
                gap: '0.5rem',
                cover: true,
                autoplay: true,
                waitForTransition: true,
                interval: 3200,
                drag: false,
                pauseOnHover: false,
                pauseOnFocus: false,
                pagination: false
            }}>
            <SplideTrack className='w-full h-full transition-all duration-1000 ease-linear' >
                {[image1, image2, image3, image4, image5, image6].map((img, index) => {
                    return <SplideSlide key={index} className="w-full h-full p-10">
                        <div className={`absolute w-2/6 ${props.carousel_textContainer} flex flex-col items-start text-white transition-all duration-1000 ease-linear text-5xl`}>
                            <h1 className="text-white text-2xl md:text-[38px] font_gotham font-semibold tracking-expand">DENIM</h1>
                            <p className="mt-1 mb-4 text-base md:text-xl font_gotam_light text-white">For Women</p>
                            <LinkBtn href="/productlisting" my="my-0" bg="bg-white" text="text-black" classes="w-full md:w-[198px] text-xs md:text-base" >Shop Now</LinkBtn>
                        </div>
                        <Image className='w-full h-full' src={img} alt="Urban images" />
                    </SplideSlide>
                })}
            </SplideTrack>

            {/* Carousel Title */}
            <div className="w-full text-center absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-cente space-y-5">
                <h1 className="text-[28px] md:text-[64px] text-white font_gotham_medium tracking-expand">URBAN FITS</h1>
                <h3 className="font_gotam_light text-base md:text-[28px] text-white">UNITED ARAB EMIRATES</h3>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-default">
                <i class="fa-solid fa-chevron-up fa-bounce text-white text-base md:text-2xl"></i>
                <span className='text-white text-[10px] md:text-sm font_gotham_medium tracking-widest' >SCROLL DOWN</span>
            </div>

            {/* Buttons for next, prev slide and to pause the carousel */}
            <div className="splide__arrows absolute flex space-x-5 bottom-[8%] right-10">
                <button className="splide__arrow--prev hover:bg-gray-500 flex justify-center items-center w-8 h-8 rounded-full bg-white rotate-180 transition-all duration-500" >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4689 22.4366C15.9575 22.1485 16.1328 21.6349 15.8823 21.2215C15.8197 21.115 14.8551 20.1066 13.7464 18.9854L11.7295 16.9372L17.2979 16.9247C23.3798 16.9059 23.0729 16.9247 23.3548 16.5426C23.455 16.411 23.4863 16.2732 23.4863 15.9976C23.4863 15.722 23.455 15.5842 23.3548 15.4527C23.0729 15.0706 23.3798 15.0894 17.2979 15.0706L11.7295 15.0581L13.7464 13.0099C14.8551 11.8887 15.8197 10.8803 15.8823 10.7738C16.1141 10.3917 15.995 9.94699 15.5816 9.62755C15.2747 9.38953 14.924 9.38953 14.5857 9.62128C14.4542 9.71524 13.0574 11.0807 11.479 12.6591C9.14265 15.008 8.61024 15.5717 8.56014 15.7659C8.42234 16.2732 8.39102 16.2357 11.479 19.3361C13.0574 20.9146 14.4417 22.2738 14.5669 22.3615C14.8926 22.587 15.1682 22.612 15.4689 22.4366Z" fill="black" />
                    </svg>
                </button>

                <button onClick={togglePlay} className="splide__toggle hover:bg-gray-500 flex justify-center items-center w-8 h-8 rounded-full bg-white  transition-all duration-500" >
                    {play === false ? <i className="material-symbols-rounded fill">play_arrow</i>
                        : <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1.25" y1="12" x2="1.25" stroke="black" strokeWidth="1.5" />
                            <line x1="7.25" y1="12" x2="7.25" stroke="black" strokeWidth="1.5" />
                        </svg>}
                </button>

                <button className="splide__arrow--next hover:bg-gray-500 flex justify-center items-center w-8 h-8 rounded-full bg-white transition-all duration-500" >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.531 9.56336C16.0425 9.85149 15.8671 10.3651 16.1176 10.7785C16.1803 10.885 17.1449 11.8934 18.2535 13.0146L20.2704 15.0628L14.7021 15.0753C8.62009 15.0941 8.92701 15.0753 8.64515 15.4574C8.54493 15.589 8.51361 15.7268 8.51361 16.0024C8.51361 16.278 8.54493 16.4158 8.64515 16.5473C8.92701 16.9294 8.62009 16.9106 14.7021 16.9294L20.2704 16.9419L18.2535 18.9901C17.1449 20.1113 16.1803 21.1197 16.1176 21.2262C15.8859 21.6083 16.0049 22.053 16.4183 22.3725C16.7252 22.6105 17.076 22.6105 17.4142 22.3787C17.5457 22.2848 18.9425 20.9193 20.521 19.3409C22.8573 16.992 23.3897 16.4283 23.4398 16.2341C23.5776 15.7268 23.6089 15.7643 20.521 12.6639C18.9425 11.0854 17.5583 9.72622 17.433 9.63853C17.1073 9.41304 16.8317 9.38798 16.531 9.56336Z" fill="black" />
                    </svg>
                </button>
            </div>
        </Splide>
    )
}