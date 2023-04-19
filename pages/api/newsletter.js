import ConnectDB from "@/utils/connect_db"
import User from "@/models/user"
import Newsletter from "@/models/newsletter"

const CreateNewsletter = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await ConnectDB()
            let user = await User.findById(req.query.id)
            if (!user) return res.status(404).json({ success: false, msg: "User not found" })
            let letter = await Newsletter.findOne({ email: req.body.email })
            if (letter) return res.status(400).json({ success: false, msg: "This email has already subscribed our Newsletter" })
            letter = await ( await Newsletter.create(req.body)).populate("user")
            res.status(200).json({
                success: true,
                data: letter,
                msg: "You have successfully subscribed to our newsletter!"
            })
        }
        else {
            res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        res.status(400).json({ success: false, msg: "Internal server error, please try again later" })
    }
}

export default CreateNewsletter