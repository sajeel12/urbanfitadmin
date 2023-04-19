import ConnectDB from "@/utils/connect_db"
import Addresses from "@/models/addresses"
import User from "@/models/user"
// import NextCors from 'nextjs-cors';
const jwt = require("jsonwebtoken")

const UpdateAddress = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            await ConnectDB()
            if (!req.query.user_id) return res.status(400).json({ success: false, msg: "User id not provided" })
            let user = await User.findById(req.query.user_id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })
            let addresses = await Addresses.findOne({ user_id: req.query.user_id })
            if (!addresses) return res.status(400).json({ success: false, msg: "This user does not have any addresses" })

            // finding the tag (shipping or billing address) specific address document and updating if already exists or adding if not exists
            let addressObj = await Addresses.findOne({ user_id: req.query.user_id, "addresses.tag": req.body.tag })
            if (addressObj) {
                addressObj = await Addresses.findOneAndUpdate({ user_id: req.query.user_id, "addresses.tag": req.body.tag }, { $set: { "addresses.$": req.body } }, { new: true })
            }
            if (!addressObj) {
                addressObj = await Addresses.findOneAndUpdate({ user_id: req.query.user_id }, { $push: { addresses: req.body } }, { new: true })
            }
            const payload = jwt.sign({...addressObj }, process.env.SECRET_KEY)
            res.status(200).json({
                success: true,
                msg: "Your Address updated successfully",
                payload
            })
        }
        else {
            res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error occurred, please try again later." })
    }
}
export default UpdateAddress