import ConnectDB from "@/utils/connect_db"
import Addresses from "@/models/addresses"

const AddAddress = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            await ConnectDB()
            let addresses = await Addresses.findOne({user_id: req.body.user_id})
            if (addresses && addresses.addresses.length === 2) return res.status(400).json({ success: false, msg: "Maximum limit reached! Can not add more than 2 addresses." })
            addresses = await Addresses.create(req.body)
            res.status(200).json({
                msg: "Success !",
                addresses
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

export default AddAddress