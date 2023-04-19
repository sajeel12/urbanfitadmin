import React from 'react'
import Signing from '../components/signin&up'
import * as Yup from 'yup'

export default function Login() {
  // schema and vallidation for Login
  const loginSchema = Yup.object({
    "email": Yup.string().required("Please enter your Email address or Username"),
    "password": Yup.string().min(8).max(30).required("Please enter your password"),
  })
  const initialLoginValues = { "email": '', "password": '' }
  return (
    <Signing page='login' validationSchema={loginSchema} initialValues={initialLoginValues} />
  )
}
