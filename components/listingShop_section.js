import React from 'react'
import Image from 'next/image'

export default function ListingShopSection(props) {
    return (
        <div className={` hidden lg:flex relative w-full h-[430px] justify-between ${props.classes}`}>
            <div className={`lg:w-3/5 h-full z-10 ${props.whiteTheme ? 'bglisting_white' : 'bglisting_black'}`}>
                <svg className='absolute top-12 left-44 2xl:left-60' width="582" height="102" viewBox="0 0 582 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.978516 1H580.621V101.5" stroke={props.whiteTheme ? 'black' : 'white'} stroke-width="2" />
                </svg>
                <div className="absolute left-32 2xl:left-48 top-1/2 -translate-y-1/2 flex flex-col">
                    <h2 className={`font_gotham_black text-[40px] mb-5 ${props.whiteTheme ? 'text-black' : 'text-white'}`}>SHOPPING WITHOUT LIMITS.</h2>
                    <p className={`mb-8 font_gotham text-[23px] ${props.whiteTheme ? 'text-black' : 'text-white'}`}>You can choose the best option for you, and it does <br /> not matter whether you are in UAE or USA. We will <br /> deliver your purchase anywhere!</p>
                    <button className={`w-[168px] py-3 border-2 ${props.whiteTheme ? 'border-black text-black' : 'border-white text-white'} font_gotham_black text-lg`}>SHOP NOW</button>
                </div>
            </div>
            <div className="absolute top-0 right-0 lg:w-3/5 h-full">
                <Image width={1000} height={450} src={props.img} alt='shopping section cover image' className='h-full float-right object-cover object-right' />
            </div>
        </div>
    )
}
