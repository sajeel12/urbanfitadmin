import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
const CryptoJS = require("crypto-js")

const ResetPassword = async (req, res) => {
    try {

        if (req.method === 'PUT') {
            await ConnectDB()
            let user = await User.findOne({ email: req.body.email })
            if (!user) user = await User.findOne({ username: req.body.email }) //so that user can put the username or email in the same field and api should verify from both ways
            if (!user) return res.status(404).json({ success: false, msg: "You don't have an account with this email!" })
            
            const newPassword = CryptoJS.AES.encrypt(req.body.confirm_password, process.env.SECRET_KEY).toString()
            await User.findOneAndUpdate({email: req.body.email}, {password: newPassword})
            res.status(200).json({ success: true, resetPassword: true, msg: "Your password has been updated!"})
        }
        else {
            res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error occurred, pleae try again later" })
    }
}
export default ResetPassword