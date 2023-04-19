import React from 'react'
import styles from '@/styles/Loader.module.css'
import Image from 'next/image'
import Urban_logo from "@/public/logos/logo_gold.svg"

export default function Loader() {
    return (
        <section className='fixed inset-0 z-[999] w-screen h-full flex justify-center items-center bg-black/60'>
            <div className='flex justify-center items-center'>
                <Image unoptimized={true} className='fixed w-10 z-50 translate-x-[2px] translate-y-1' src={Urban_logo} alt="Urban logo" ></Image>
                <div className={styles.loader}></div>
            </div>
        </section>
    )
}
