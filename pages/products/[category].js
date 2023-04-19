import React, { useState, useEffect } from 'react'
import CatalogueCarousel from '@/components/carousels/catalogueCarousel';
import Navbar from '../../components/navbar';
import Shoppingcard from '@/components/cards/shoppingcard';
import Footer from '../../components/footer'
import LinkBtn from '@/components/buttons/link_btn';
import ListingShopSection from '@/components/listingShop_section';

// imports for images
import image1 from '../../public/card imgs/card img6.jpg'
import image2 from '../../public/card imgs/card img2.jpg'
import image3 from '../../public/card imgs/card img10.jpg'
import listingBg1 from '@/public/listingbg1.jpg'
import listingBg2 from '@/public/listingbg2.jpg'

export default function productlisting(props) {
    const { category } = props
    const [hideNav, setHideNav] = useState(true);

    useEffect(() => {
        const setSizefunc = () => {
            let position = window.pageYOffset;
            if (position >> 2) {
                setHideNav(false)
            }
            else setHideNav(true)
        }
        window.addEventListener('scroll', setSizefunc);
    }, []);

    const product = {
        name: 'Sample Product title - UF',
        price: '76.99',
        variants: [1, 2, 3, 4]
    }

    return (
        <>
            <Navbar hideNav={hideNav} />
            <main className="w-full pb-20 bg-white flex justify-center font_gotham overflow-hidden">
                <section className='' >
                    <CatalogueCarousel />
                    <div className='w-full p-5 md:p-7 lg:p-10 lg:pt-9 h-full font_gotham text-left pt-9' >
                        <h2 className="text-3xl md:text-4xl mb-4 capitalize">{category}</h2>
                        <div className="w-full my-6 md:my-10 flex flex-wrap overflow-hidden">
                            <div className="w-full flex my-4 items-center">
                                <span className="text-xl cursor-pointer">Filters <i className="material-symbols-outlined translate-y-1">sort</i> </span>
                            </div>
                            {[{ img: image1 }, { img: image2 }, { img: image3 }, { img: image1 }, { img: image2 }, { img: image3 }, { img: image1 }, { img: image2 }, { img: image3 }, { img: image1 }, { img: image2 }, { img: image3 }].map((productData, index) => {
                                const product = {
                                    name: 'Sample Product title - UF',
                                    price: '76.99',
                                    variants: [1, 2, 3, 4]
                                }
                                if (index == 4) return <>
                                    <ListingShopSection img={listingBg1} />
                                    <Shoppingcard product={product} img={productData.img} />
                                </>
                                return <Shoppingcard product={product} img={productData.img} />
                            })}
                        </div>
                        <button className="group flex items-center w-auto mx-auto font_gotham_bold text-sm tracking-expand md:tracking-[1.5em] md:hover:tracking-[1em] transition-all duration-300">
                            <span className="w-16 group-hover:w-28 h-[2px] mx-1 bg-black transition-all"></span>
                            <span className="w-5 group-hover:w-0 h-[2px] mx-1 bg-black transition-all"></span>
                            &nbsp;MORE
                            <span className="w-5 group-hover:w-0 h-[2px] mx-1 bg-black transition-all"></span>
                            <span className="w-16 group-hover:w-28 h-[2px] mx-1 bg-black transition-all"></span>
                        </button>
                        <div className="w-full mt-10">
                            <h3 className="text-2xl font_gotham_medium tracking-widest">MORE TO EXPLORE</h3>
                            <div className="w-full my-5 flex flex-wrap">
                                {["Ready to Wear", "Atelier Urban", "Essentials", "Bags", "Sneakers"].map(link => {
                                    return <LinkBtn href={`/products/${link}`} classes="mr-3 px-[7%] md:px-[4%] border border-gray-400" my="my-1" text="text" bg="bg-white" >{link}</LinkBtn>
                                })}
                            </div>
                            <section className="w-full my-6 md:my-10 flex flex-wrap overflow-hidden">
                                <Shoppingcard product={product} img={image3} />
                                <Shoppingcard product={product} img={image3} />
                                <Shoppingcard product={product} img={image3} />
                                <Shoppingcard product={product} img={image3} />
                            </section>
                        </div>
                    </div>
                </section>
            </main>
            <ListingShopSection whiteTheme img={listingBg2} />
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { category } = await context.query
    // let response = await (await fetch(`${process.env.HOST}/api/products/getsingleproduct?id=${p_id}`)).json()
    return { props: { category } }
}