import React, { useState, useEffect } from 'react'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';
// images imports
import Image from 'next/image'
import image1 from '../../public/carousel2 imgs/img1.png'
import image2 from '../../public/carousel2 imgs/img2.png'
import image3 from '../../public/carousel2 imgs/img3.png'
import image4 from '../../public/carousel2 imgs/img4.png'

export default function HomeCarousel2() {
  const [isMobile, setIsMobile] = useState(3)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 967px)')
    media.matches ? setIsMobile(3) : setIsMobile(5)
  }, [])

  const setSlider = (splide, newIndex) => {
    const slides = splide.Components.Slides.get()
    slides.forEach((slide, index) => {
      const distance = Math.abs(index - newIndex) * 10
      const scale = Math.abs(1 - (distance / 70)).toFixed(2)
      if (scale > 0.4 && scale < 0.5) return slide.slide.style.transform = `translateX(14vw) scale(${scale})`
      if (scale > 0.5 && scale < 0.6) return slide.slide.style.transform = `translateX(8vw) scale(${scale})`
      if (scale > 0.6 && scale < 0.78) return slide.slide.style.transform = `translateX(4vw) scale(${scale})`
      if (scale > 1) return slide.slide.style.transform = `translateX(10vw) scale(${scale})`
      slide.slide.style.transform = `scale(${scale})`
      // slide.slide.style.transform = `translateX(4vw) scale(${scale})`
    });
  }

  // this function works in mobile
  const onmove = (splide, newIndex) => {
    const slides = splide.Components.Slides.get()
    slides.forEach((slide, index) => {
      const distance = Math.abs(index - newIndex) * 10
      const scale = Math.abs(1 - (distance / 40)).toFixed(2)

      const s_width = screen.width
      let fraction_center = s_width / 3 * scale / 2
      let n_percent = (percent) => {
        return s_width / 100 * percent
      }
      if (scale < 0.6) return slide.slide.style.transform = `translateX(-${fraction_center + n_percent(7)}px) scale(${scale})`
      if (scale < 0.9) return slide.slide.style.transform = `translateX(-${fraction_center + n_percent(10)}px) scale(${scale})`
      if (scale == 1) return slide.slide.style.transform = `translateX(-${fraction_center + n_percent(7)}px) scale(${scale})`
    });
  }

  const onPGMounted = () => {
    let carouselWidth = document.querySelector('.homeCarousel2').offsetWidth
    let pagination = document.querySelector('.splide__pagination')
    if(window.matchMedia('(max-width: 967px)').matches){
      pagination.style.left = `0rem`
    }
    else{
      pagination.style.left = `calc(${carouselWidth}px - 100vw)`
    }
    let pageItems = document.querySelectorAll('.splide__pagination__page')
    pageItems.forEach((item) => {
      item.style.width = '2px'
      item.style.height = '10px'
      item.style.borderRadius = '0'
      item.style.background = 'gray'
      item.style.margin = '0.9rem'
      item.style.transition = 'all 0.4s'
    })
  }

  return (
    <>
      <Splide
         onMove={window.matchMedia('(max-width: 967px)').matches?onmove:setSlider}
        onPaginationMounted={onPGMounted}
        className="homeCarousel2 relative w-full h-full" hasTrack={false}
        options={{
          type: 'loop',
          autoplay: true,
          speed: 500,
          interval: 2200,
          rewind: true,
          drag: false,
          arrows: false,
          perMove: 1,
          direction: 'ltr',
          gap: '1rem',
          perPage: isMobile,
          pauseOnHover: true,
          pauseOnFocus: false,
          focus: 'right'
        }}
      >
        <SplideTrack className='lg:translate-x-[4vw] w-full h-full flex justify-center items-center'>
          {[image1, image1, image1, image1, image1].map((img, index) => {
            return <SplideSlide key={index} className={`group relative aspect-auto md:p-3 transition-all duration-500`}>
              <Image src={img} className='w-full h-full object-contain -translate-x-[3.4vw]' alt="Urban images" />
              {/* <div className="opacity-0 group-hover:opacity-100 bg-white/50 p-3 rounded-lg absolute -left-20 top-[15%] transition-all">
              <h3 className='text-lg text-black font-semibold'>Moodi G ka Corler</h3>
            </div>
            <div className="opacity-0 group-hover:opacity-100 bg-white/50 p-3 rounded-lg absolute -left-20 bottom-[15%] transition-all">
              <h3 className='text-lg text-black font-semibold'>Moodi G ka Pajama</h3>
            </div> */}
            </SplideSlide>
          })}
        </SplideTrack>

        <h2 className="lg:hidden absolute left-5 bottom-20 font_gotham_medium tracking-widest text-xl md:text-3xl lg:text-5xl word-wrap leading-tight">URBAN<br />NEW ARRIVAL</h2>
      </Splide>
    </>
  )
}
