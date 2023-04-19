import React from 'react'
import Signing from '../components/signin&up'
import * as Yup from 'yup'

export default function ForgotPassword() {
      // schema and vallidation for forgot password
      const forgotpassSchema = Yup.object({
        "email": Yup.string().required("Please enter your Email or Username address"),
    })
    const initialForgotPasswordValues = { email: '' }
  return (
    <Signing page='login' type='forgotpass' validationSchema={forgotpassSchema} initialValues={initialForgotPasswordValues} />
  )
}
