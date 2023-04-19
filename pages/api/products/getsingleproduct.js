import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"

// Only Accessable by Admin
const GetSingleProducts = async (req, res) => {
    try {
        await ConnectDB()
        let product = await Product.findById(req.query.id)
        res.status(200).json({
            msg: "Success !",
            product
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error occurred. Please retry")
    }
}

export default GetSingleProducts