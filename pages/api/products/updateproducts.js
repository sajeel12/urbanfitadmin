import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"

// Only accessable by Admin 
const UpdateProducts = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            await ConnectDB()
            if (!req.query.id) {
                let products = await Product.updateMany({}, req.body)
                res.status(200).json({
                    success: true,
                    msg: `Success ! All products has been updated successfully`,
                    products
                })
            }
            else if (req.query.id) {

                let product = await Product.findById(req.query.id)
                if (!product) return res.status(404).json({ msg: "Product not found" })
                if (product) {
                    product = await Product.findByIdAndUpdate(req.query.id, req.body)
                }
                res.status(200).json({
                    success: true,
                    msg: `Success ! Products with id ${req.query.id} has been updated successfully`,
                    product
                })
            }
        }
        else {
            res.status(400).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error occurred. Please retry")
    }
}

export default UpdateProducts