import React from 'react'
import HomeCarousel2 from '@/components/carousels/homeCarousel2'

export default function NewSlider() {
    return (
        <>
            <section className="relative bg_metal_gold w-full h-[70vh] lg:h-87vh min-h-[300px] lg:px-10 lg:pr-0 flex flex-col-reverse lg:flex-row items-center justify-center font_gotham overflow-hidden">
                <div className="hidden lg:flex left-0 w-full lg:w-[35vw] lg:h-full md:pl-10 mb-3 lg:m-0 leading-7 flex-col justify-center items-start">
                    <h2 className="text-xl md:text-3xl lg:text-[32px] word-wrap font_gotham_medium leading-tight">URBAN<br />NEW ARRIVAL</h2>
                </div>
                <div className="h-full w-full lg:w-[65vw] flex items-center">
                    <HomeCarousel2 />
                </div>
            </section>
        </>
    )
}
