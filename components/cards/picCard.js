import React from 'react'
import LinkBtn from '../buttons/link_btn'
import Image from 'next/image'

export default function PicCard(props) {
    return (
        <div className='relative w-full lg:w-48pr h-full rounded-[2.3rem] font_gotham_medium overflow-hidden' >
            <Image unoptimized={true} src={props.img} className={`w-full h-full object-cover ${!props.object_fit?"object-top" : props.object_fit}`} alt="Urban images"/>
            <div className="absolute w-full bottom-0 left-0 m-7 flex flex-col items-start text-5xl">
                <h3 className="text-base lg:text-lg tracking-expand text-white">{props.h1}</h3>
                <h3 className="text-base lg:text-lg tracking-expand mt-1 mb-4 text-white">{props.h2}</h3>
                <LinkBtn href={props.href} my="my-0" classes="w-1/2 md:w-1/3 lg:w-35pr font_gotham_light">{props.btnValue}</LinkBtn>
            </div>
        </div>
    )
}
