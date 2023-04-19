import ConnectDB from "@/utils/connect_db"
import Addresses from "@/models/addresses"
import User from "@/models/user"
import NextCors from 'nextjs-cors';
const jwt = require("jsonwebtoken")

const CreateAddress = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await ConnectDB()
            let user = await User.findById(req.query.user_id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })
            let addresses = await Addresses.findOne({user_id: req.query.user_id})
            if(addresses) return res.status(400).json({ success: false, msg: "This address schema already exists" })
            addresses = await Addresses.create({
                "user_id": req.query.user_id,
                "addresses": []
            })
            const payload = jwt.sign({...addresses}, process.env.SECRET_KEY)
            res.status(200).json({
                success: true,
                msg: "User Address schema has been created successfully",
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

export default CreateAddress