import ConnectDB from "@/utils/connect_db"
// import { Twilio } from "twilio";

const SendOtp = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await ConnectDB()
            const accountSid = '';
            const authToken = '';
            const client = require('twilio')(accountSid, authToken);

            // const otp = require('crypto-random-string')({ length: 6, type: 'numeric' });
            const otp = 352061

            client.messages
                .create({
                    body: `Hey your OTP code is ${otp}`,
                    from: '03164975295',
                    to: '03420046922'
                })
                .then(message => console.log(message.sid))
                .catch(error => console.log(error));

            // const accountSid = "ACc5361c82b5155fcdc1c7e968d3f7d7ea";
            // const authToken = "f1f51dc1278638394b98bfbeeaa62aaf";
            // const verifySid = "VA9e639d7b6a3c9926e7a2a9fc48cc5d96";
            // const client = require("twilio")(accountSid, authToken);

            // client.verify.v2
            //     .services(verifySid)
            //     .verifications.create({ to: "+923164975295", channel: "sms" })
                // .then((verification) => console.log(verification.status, 'yeah baby'))
                // .then(() => {
                //     const readline = require("readline").createInterface({
                //         input: process.stdin,
                //         output: process.stdout,
                //     });
                //     readline.question("Please enter the OTP:", (otpCode) => {
                //         client.verify.v2
                //             .services(verifySid)
                //             // .verificationChecks.create({ to: "+923164975295", code: otpCode })
                //             // .then((verification_check) => console.log(verification_check.status))
                //             .then(() => readline.close());
                //     });
                // });


            res.status(200).json({
                success: true,
                msg: "Your mobile otp sent successfully !",
            })
        }
        else {
            res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
    }
}
export default SendOtp