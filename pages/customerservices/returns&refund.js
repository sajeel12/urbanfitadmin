import React from 'react'
import CutomerServices from '.'
import Accordian from '@/components/accordians/accordian'
import LinkBtn from '@/components/buttons/link_btn'

export default function ReturnsRefund() {
    return (
        <CutomerServices>
            <h1 className="mb-7 text-lg lg:text-xl font_gotham_bold tracking-expand">RETURNS AND REFUND</h1>
            <Accordian title='EXCHANGE, RETURNS & REFUND'>
                <p className='text-black' >
                    All items purchased in the Urbanfits online store may be returned to us free of charge within 14 days after receipt.​​​​​​​ All refunds will need to be accompanied by order confirmation when returning items and we will offer you an exchange if the size is available, credit note or full refund via the original payment method, provided the items have their original labels and are in the same condition as they were sent. The following items may not be returned: underwear, swimwear, perfumes and make-up
                </p>
            </Accordian>
            <Accordian title='EXCHANGE / RETURN VIA COURIER'>
                <p className='text-black' >
                    If you would like to exchange/ return through courier collection, please get in touch with our Customer Care at support@urbanfits.ae. Exchanges through courier collection shall only be done, for exchange of size, if available. You may indicate clearly the replacement merchandise requested and our Customer Care Associate will confirm, if the said merchandise is available in available stock and whether the exchange can be made.
                    The refund against a return request made to urbanfits.ae customer support, and collected by courier from the delivery address where the item was originally delivered, shall be processed only upon receipt of the merchandise in unused condition, along with the original sales invoice. <br />
                    After the merchandise is received by urbanfits.ae and subject to verification of the purchase and condition of merchandise, we shall process a refund/exchange within 7 working days of receipt of the merchandise. In case of Cancellation, Refunds of payments charged to the Cardholders debit/credit card will only be credited back to the Cardholder's debit/credit card account, which was used to pay for the original order. Please note that we shall not be responsible for any delays in credit to the Cardholders debit/credit card account as that is managed by the Cardholders issuing bank. <br />
                    EXCHANGE/ REFUND TIMEFRAME <br />
                    UP TO 8-10 WORKING DAYS** <br />
                    Before accepting delivery of any merchandise, please confirm/ ensure that the packaging has not been damaged or tampered with. If you think that the merchandise is not in good condition, or if the packaging is tampered with or damaged while delivery, then refuse to take delivery of the package, and call our Customer Care at (800-000000) or e-mail us at support@urbanfits.ae mentioning your order reference number. A replacement delivery, if the size is available, will made to at the earliest, at no extra cost. <br />
                    If you return any merchandise which is delivered to you in damaged condition, we will refund the shipping charges for that merchandise, if we are not able to replace the merchandise.
                </p>
            </Accordian>
            <Accordian title='EXCHANGE / RETURNS POLICY'>
                <p className='text-black' >
                    All products purchased on the website may be returned within the following time frame at your own risk. You need to inform us of your intention to return the product(s) within 14 days after the day on which the product(s) come into your physical possession (or into the possession of a third party other than the carrier and indicated by you). You then need to physically return such product(s) to us without undue delay and in any event not later than 5 days after the day you informed us about your intention to return the product(s). <br /> <br />
                    The following items may not be returned: underwear, swimwear, gift cards, perfumes and make-up (unless in original sealed wrapping). <br />
                    Please make sure that you do not have returns from multiple orders in one parcel to ensure that you get your refund as quickly as possible.<br />
                    Returned goods must be returned in the same condition as they were sent – and must have their original label. We will not accept or refund goods that have been used, worn or washed.<br />
                    If the goods have deteriorated due to a more extensive use, we reserve the right to send the product back to the shipper.
                </p>
            </Accordian>
            <Accordian title='RFUNDS'>
                <h3 className="mb-2 text-sm font_gotham_bold">REFUNDS VIA COURIER</h3>
                <p className='text-black' >
                    If you withdraw from your order, we will reimburse to you all payments received from you, including the costs of standard delivery, without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to return products.<br />
                    We may however withhold reimbursement until we have received the products back or until you have supplied evidence of having sent back the products, whichever is the earliest.<br />
                    Once your returned products have been checked and inspected at our warehouse, you will receive a refund email notification. Your refund will be paid back to you in the form of a credit note to be used at urbanfits.ae or UrbanFits stores in the country of purchase or via the original form of payment.<br />
                    Refunds usually take up to 8-10 working days to appear on your statement. The length of time depends solely on your card company’s policies. You can always check your refund status on your online account or by contacting your card issuer. In order to get a full refund it’s important that we receive the goods in the same state you received them (the returned product has to be complete, unworn, unwashed and with all the product labels intact).
                </p>
            </Accordian>
            <Accordian title='OUT TIP'>
                <p className='text-black' >
                    To make the right choice when it comes to size and fit please do check the product description, wherever possible our editors will comment if an item fits small, loose or true to the size.<br />
                    Please also have a careful look at our size charts.
                </p>
            </Accordian>
            <Accordian title='EXCHANGE'>
                <p className='text-black' >
                    We do not have an exchange service. You can of course return any product that you are not fully satisfied with.<br />
                    As soon as your returned parcel reaches our warehouse, your refund will be issued.<br />
                    If you would like another product, color or size, please place a new order.
                </p>
            </Accordian>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center font_gotham text-sm">
                <div><span className="font_gotham_medium tracking-widest">NEED HELP?</span>We are available Monday to Sunday: 9 AM 6 PM</div>
                <LinkBtn my='0' classes='w-1/3 lg:w-1/5' href='/contact' >Contact Us</LinkBtn>
            </div>
        </CutomerServices>
    )
}
