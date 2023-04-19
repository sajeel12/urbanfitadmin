// function to get address and store address token in the local storage
const storeAddress = async (user_id) => {
    let res = await fetch(`${process.env.HOST}/api/user/addresses/get?user_id=${user_id}`)
    let address = await res.json()
    localStorage.setItem("addressToken", address.payload)
}
export default storeAddress