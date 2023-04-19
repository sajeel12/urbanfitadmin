import jwt from 'jsonwebtoken'
// function to get address data from server and it'll run only when user signs up
const initiateAddress = async (payload, router) => {
    let user_id = jwt.decode(payload)._doc._id
    if (router.pathname === "/signup") {
        let address = await fetch(`${process.env.HOST}/api/user/addresses/create?user_id=${user_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        let parsedAddress = await address.json()
        localStorage.setItem("addressToken", parsedAddress.payload)
    }
    else if (router.pathname === "/login") {
        let address = await fetch(`${process.env.HOST}/api/user/addresses/get?user_id=${user_id}`)
        let parsedAddress = await address.json()
        localStorage.setItem("addressToken", parsedAddress.payload)
    }
    else return
}
export default initiateAddress