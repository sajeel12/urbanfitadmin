import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import errorIcon from '@/public/error.svg'
import successIcon from '@/public/success.svg'
import Button from './buttons/simple_btn'

export default function ErrorPage(props) {
    const router = useRouter()
    const pushBack = ()=>{
        router.back()
    }
    return (
        <section className='w-full h-screen p-4 flex flex-col justify-center items-center' >
            <Image src={props.type==='error'?errorIcon: successIcon} alt="error icon" />
            <h3 className="text-2xl font_gotham">{props.heading}</h3>
            <span className="text-lg font_gotam_light text-center">{props.message}</span>
            {props.type==='error'?<Button onclick={pushBack} classes="w-1/2 lg:w-56" >Try Again</Button>: <Button onclick={pushBack} classes="w-1/2 lg:w-56" >Back</Button>}
        </section>
    )
}