import React from 'react'
import Link from 'next/link'
import { useCart } from "react-use-cart";
import Image from 'next/image'
import toaster from '@/utils/toast_function'

export default function Shoppingcard(props) {
    const { product } = props
    const { addItem } = useCart()

    return (
        <div key={props.li_key} className={`relative bg-gray-100 border ${props.classes ? props.classes : 'w-48pr md:w-[32%] lg:w-[315px] h-[290px] lg:h-[460px]'} ${props.margin ? props.margin : 'mr-auto my-3 md:my-5'} rounded-2xl lg:rounded-3xl shadow-md hover:scale-[1.01] hover:rounded-xl font_gotham transition-all duration-500 overflow-hidden`} >
            <button onClick={() => { addItem({ product_id: product._id, id: product.variants[0]._id, name: product.name, price: product.price, shipping_fee: product.shipping_detials.fees, stock: product.variants[0].stock, size: product.variants[0].size[0], sizes: product.variants[0].size, color: product.variants[0].color_name, images: product.variants[0].images }, 1); toaster('success', "Your item is added to the Cart") }} className="group w-9 h-9 absolute top-2 md:top-4 right-2 md:right-4 z-20 transition-all duration-300 rounded-full flex justify-center items-center bg-white/60 hover:bg-gold-land">
                <i className="material-symbols-outlined text-xl md:text-[1.6rem] group-hover:text-white">local_mall</i>
            </button>
            <Link href={`/products/product/${props.id}`}>
                <div className="relative w-full h-3/4 md:h-4/5">
                    <Image src={props.img} width={640} height={853} className={`w-full h-full object-cover ${!props.object_fit ? props.object_fit : "object-center"}`} alt='Urban Fits' />
                </div>
                <div className="w-full h-1/4 md:h-1/5 max-h-12 md:max-h-16 my-2 lg:my-4 px-3 text-black flex flex-col items-center">
                    <h4 className="font_gotham_medium md:font_gotham_bold tracking-widest text-[10px] text-center md:text-xs capitalize" aria-valuemax={15} >{props.product.name.toUpperCase()}</h4>
                    <div className="w-full px-3 absolute bottom-2 md:bottom-4 my-1 flex justify-between font_gotham text-[10px] md:text-[13px]">
                        <small className='tracking-widest' >{props.product.variants.length} COLOR(S)</small>
                        <small className='tracking-widest' >${props.product.price}</small>
                    </div>
                </div>
            </Link>
        </div>
    )
}
