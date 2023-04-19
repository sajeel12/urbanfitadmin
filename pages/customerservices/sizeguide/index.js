import React from 'react'
import CutomerServices from '../index'
import Link from 'next/link'
import Image from 'next/image'
import img1 from '@/public/card imgs/card img6.jpg'
import img2 from '@/public/card imgs/card img5.jpg'
import img3 from '@/public/card imgs/card img12.jpg'

const GuideCard = (props) => {
    return <Link href={props.href} className='group w-[200px]'>
        <div className='w-full h-[300px] overflow-hidden'>
            <Image src={props.img} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-700' />
        </div>
        <h4 className="mt-4 font_gotham_medium text-sm tracking-wide group-hover:tracking-expand transition-all duration-700">{props.title}</h4>
    </Link>
}

export default function SizeGuide() {
    return (
        <CutomerServices>
            <div className="flex gap-5">
                <GuideCard href='/customerservices/sizeguide/women' img={img1} title='WOMEN' />
                <GuideCard href='/customerservices/sizeguide/men' img={img2} title='MEN' />
                <GuideCard href='/customerservices/sizeguide/kids' img={img3} title='KIDS' />
            </div>
        </CutomerServices>
    )
}
