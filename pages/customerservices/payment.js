import React from 'react'
import CustomerServices from './index'

export default function Payment() {
    return (
        <CustomerServices>
            <h1 className="mb-7 text-lg lg:text-xl font_gotham_bold tracking-expand">PAYMENT</h1>
            <div className="w-full p-4 lg:p-7 mb-6 text-sm bg-gray-50 rounded-lg font_gotham_light">
                <div className="w-full flex mb-3 gap-x-20">
                    <span className="flex flex-col items-start">
                        <h3 className="mb-2 font_gotham_medium tracking-widest text-sm">CREDIT CARD *</h3>
                        <i class="fa-solid fa-check fa-fade text-green-500"></i>
                    </span>
                    <span className="flex flex-col items-start">
                        <h3 className="mb-2 font_gotham_medium tracking-widest text-sm">DEBIT CARD *</h3>
                        <i class="fa-solid fa-check fa-fade text-green-500"></i>
                    </span>
                </div>
                <p className="text-black">
                    * We currently accept Visa, MasterCard debit and credit cards.<br />
                    During the payment process UrbanFits Group has the right to perform credit checks. Based on the outcome of credit checks we may change, adjust or decline an order and/or the selected payment method.<br />
                    In most cases we will offer you the option to select another payment method. The credit results are not known to our customer service team.
                </p>
            </div>
        </CustomerServices>
    )
}
