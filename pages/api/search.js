import ConnectDB from "@/utils/connect_db"
import Product from "@/models/product"

// Only accessable by Admin 
const UpdateProducts = async (req, res) => {
    try {
        if (req.method === 'GET') {
            await ConnectDB()
            console.log(req.query.q)
            const searchTerm = req.query.q
            const results = await Product.find({
                $or: [
                    { category: { $regex: searchTerm, $options: "i" } },
                    { name: { $regex: searchTerm, $options: "i" } },
                    { tags: { $elemMatch: { $regex: searchTerm, $options: "i" } } }
                ]
                // $or: [
                //     // { category: { $regex: searchTerm, $options: "i" } },
                //     // { name: { $regex: searchTerm, $options: "i" } },
                //     { subcategories: {$in: searchTerm}  }
                // ]
            })
            res.json(results);
        }
        else {
            res.status(400).json({ error: "bad request, you are using wrong request method!" })
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error occurred. Please retry")
    }
}

export default UpdateProducts