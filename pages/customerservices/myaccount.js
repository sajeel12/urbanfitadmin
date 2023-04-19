import React from 'react'
import CutomerServices from '.'

export default function MyAccount() {
    return (
        <CutomerServices>
            <h1 className="mb-7 text-lg lg:text-xl font_gotham_bold tracking-expand">MY ACCOUNT</h1>
            <div className="w-full p-4 lg:p-7 mb-6 text-sm bg-gray-50 rounded-lg font_gotham_light">
                Register to My Account to take full advantage of your Online Experience.<br /><br />
                <h1 className="mb-3 font_gotham_medium tracking-widest">WHAT IS MY ACCOUNT?</h1>
                <p>
                    We offer you the option to register and sign up for a Urban Fits online account. A Urban Fits account grants you the access to extra services.<br />
                    - You will have access to the details of your order(s) whenever you need them.<br />
                    - A convenient place to track and trace for all of your order(s).<br />
                    - A handy Wishlist for saving your favorite products or sharing them with friends.<br />
                    - You have access to your online Address Book where you can manage your billing and delivery addresses.
                </p>
            </div>
        </CutomerServices>
    )
}
