// import { getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]"
// import { createUser } from 'next-auth/client'

// export default async (req, res) => {
//     const user = await createUser({
//         email: "saad@gmail.com",
//         password: "12345678",
//         firstname: "Saad",
//         lastname: "Arshad",
//         phone: "03164975295",
//       })
//   const session = await getServerSession(req, res, authOptions)
//   if (session) {
//     res.send({
//       content:
//         "This is protected content. You can access this content because you are signed in.",
//         user
//     })
//   } else {
//     res.send({
//       error: "You must be signed in to view the protected content on this page.",
//       user
//     })
//   }
// }