import React from 'react'
import Signing from '../components/signin&up'
import * as Yup from 'yup'

export default function Signup() {
  // schema and vallidation for Sign Up
  const signupuSchema = Yup.object({
    username: Yup.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username cannot exceed 20 characters').matches(/^[A-Za-z0-9_]+$/, 'Username must contain only letters, numbers, and underscores').notOneOf([' ', '-'], 'Username should not contain any spaces or hyphen symbols').required('Username is required'),
    email: Yup.string().email().required('Please enter your email address'),
    // phone: Yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, Please enter a valid phone number with postal code and space eg. +971 0000000000).required(),
    phone_prefix: Yup.string().required('Phone prefix is required to save'),
    phone_number: Yup.string().min(6, 'Phone number can be a minimum of 6 digits').max(14, 'Phone number can be a maximum of 14 digits').required('Phone number is required to save'),
    password: Yup.string().min(8).max(30).required('Please enter your password'),
    accept_policies: Yup.boolean().oneOf([true], "You can't go further without accepting our policies).required(You can't go further without accepting our policies")
  })
  const initialSignupValues = { username: '', email: '', phone_prefix: 'Conuntry Code', phone_number: '', password: '', accept_policies: '' }
  return (
    <>
      <Signing page='signup' validationSchema={signupuSchema} initialValues={initialSignupValues} />
    </>
  )
}
