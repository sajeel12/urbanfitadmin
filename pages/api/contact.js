import ConnectDB from "@/utils/connect_db"
import sendEmail from "@/utils/sendEmail"
import ContactTemplate from "@/email templates/contact_template"

const Contact = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await ConnectDB()
            let mail = req.body

            let template = ContactTemplate(mail)
            let info = await sendEmail({senderName: mail.firstname, to: [mail.email, 'dark_reaper6@outlook.com', 'faizan@urbansoftware.tech'] , subject: mail.subject}, template)
            res.status(200).json({
                success: true,
                msg: "Your mail sent successfully !",
                mail
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
export default Contact