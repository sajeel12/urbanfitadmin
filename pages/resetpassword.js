import React from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken';
import ErrorPage from '@/components/alertPage';
import Signing from '../components/signin&up'
import * as Yup from 'yup'

export default function Signup() {
  const router = useRouter()
  let token = router.query.token
  const payload = jwt.decode(token)
  const unixTime = Math.floor(Date.now() / 1000)
  if (!token || payload.exp <= unixTime) return <ErrorPage type="error" heading="Oh Snap! Session Expired" message="The content your are trying to access either invalid or expired. Please try again." />
  
  // schema and vallidation for reset password
  const resetpassSchema = Yup.object({
    "email": Yup.string().email(),
    "password": Yup.string().min(8).max(30).required("Please enter your password"),
    "confirm_password": Yup.string().min(8, "Password must be atleast 8 characters").max(30, "Password cannot exceed 30 characters").required("Please enter your password").oneOf([Yup.ref("password"), null], "Password must match")
  })
  const initialResetPasswordValues = { "email": payload.email, "password": '', "confirm_password": '' }
  return (
    <Signing page='login' type='resetpass' validationSchema={resetpassSchema} initialValues={initialResetPasswordValues} />
  )
}
