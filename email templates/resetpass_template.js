const resetPassTemplate = (username, token)=>{
    return `
    <html>
    <head>
<meta charset="utf-8">
<title>Password Reset Email</title>
<style>
  body {
    font-family: Arial, sans-serif;
    color: #333;
}
section{
    width: 100%;
    height: 100vh;
    padding: 1rem;
    background: #000326;
  }
  h1{
    text-align: center;
  }
  span{
     cursor: pointer;
     padding: 0.7rem 1rem;
     border: none;
     outline: none;
     border-radius: 1rem;
     background: linear-gradient(90deg, #FAE892 0%, #B3903E 100%)
     color: #ffff;
  }
</style>
</head>
    <body>
    <section>
    <h1>Reset Password</h1>
    <h4>Hi ${username}!</h4>
    <p>We received a request from your email to change the password of your Urban Fits uesr account. Click the button below to reset your password</p>
    <span><a href="${process.env.HOST}/resetpassword?token=${token}" >Reset Password</a></span>
    <p>This session will expire in 5 minutes. And don't expose this email to anyone</p>
    <p>If you did not make this request, you can ignore this email and your password will remain unchanged.</p>
    </br><small>~Urban Fits</small>
    </section>
    </body>
    </html>`
}
export default resetPassTemplate