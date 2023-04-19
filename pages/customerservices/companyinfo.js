import React from 'react'
import CutomerServices from '.'

export default function CompanyInfo() {
    return (
        <CutomerServices>
            <h1 className="mb-7 text-lg lg:text-xl font_gotham_bold tracking-expand">MY ACCOUNT</h1>
            <div className="w-full p-4 lg:p-7 mb-6 text-sm bg-gray-50 rounded-lg font_gotham_light">
                <h1 className="mb-3 font_gotham_medium tracking-widest">URBAN FITS L.L.C. (UAE)</h1>
                500 4th St NW<br />
                Suite 102 PMB 1958<br />
                Albuquerque, NM 87102
                <h1 className="mt-6 mb-2 font_gotham_medium tracking-widest">EMAIL:</h1>
                support@urbanfits.ae
                <h1 className="mt-6 mb-2 font_gotham_medium tracking-widest">TELEPHONE:</h1>
                800-000000
            </div>
        </CutomerServices>
    )
}
