import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"

// Only accessable by Admin 
const DeleteProducts = async (req, res) => {
    try {
        if (req.method === 'DELETE') {
            await ConnectDB()
            let product = await Product.findById(req.query.id)
            if (!product) return res.status(404).json({success: false, msg: "Product not found" })
            if (product) {
                product = await Product.findByIdAndDelete(req.query.id)
            }
            res.status(200).json({
                success: true,
                msg: `Success ! Products with id ${req.query.id} has been deleted successfully`
            })
        }
        else {
            res.status(400).json({success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error occurred. Please retry")
    }
}

export default DeleteProducts