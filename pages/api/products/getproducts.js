import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"

const getProducts = async (req, res) => {
    try {
        await ConnectDB()
        let products = await Product.find()
        res.status(200).json({
            length: products.length,
            products
        })
    }
    catch (err) {
        res.status(500).send("Internal Server Error occurred. Please retry")
    }
}

export default getProducts