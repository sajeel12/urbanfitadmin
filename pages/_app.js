import '@/styles/globals.css'
import '@/styles/Navbar.css'
import '@/styles/pillbtns.css'
import '@/styles/carousels.css'
import React, { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import { CartProvider } from "react-use-cart";
import LoadingBar from 'react-top-loading-bar'

function App({ Component, pageProps: { session, ...pageProps } }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("loadingModal")
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsibmV3c2xldHRlcl9zdWJfcGhvbmUiOiJpbml0IiwibmV3c2xldHRlcl9zdWJfZW1haWwiOiJpbml0IiwiZW1haWwiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0Iiwicm9sZSI6ImluaXQiLCJfaWQiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0IiwiZmlyc3RuYW1lIjoiaW5pdCIsImxhc3RuYW1lIjoiaW5pdCIsInRpdGxlIjoiaW5pdCIsImdlbmRlciI6ImluaXQiLCJwaG9uZV9udW1iZXIiOiJpbml0IiwicGhvbmVfcHJlZml4IjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwicm9sZSI6dHJ1ZSwibmV3c2xldHRlcl9zdWJfZW1haWwiOnRydWUsIm5ld3NsZXR0ZXJfc3ViX3Bob25lIjp0cnVlLCJjcmVhdGVkQXQiOnRydWUsInVwZGF0ZWRBdCI6dHJ1ZSwiX192Ijp0cnVlLCJmaXJzdG5hbWUiOnRydWUsImxhc3RuYW1lIjp0cnVlLCJ0aXRsZSI6dHJ1ZSwiZ2VuZGVyIjp0cnVlLCJwaG9uZV9udW1iZXIiOnRydWUsInBob25lX3ByZWZpeCI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NDExODRmZWE3ZWMzZmY3ZmJkZGUxYTciLCJ1c2VybmFtZSI6ImJpbGF3YWxfMTIzIiwiZW1haWwiOiJmYWl6YW5AdXJiYW5zb2Z0d2FyZS50ZWNoIiwicGFzc3dvcmQiOiJVMkZzZEdWa1gxK1hZbmlXL205ZDJHWDdwc0VXZ1ZUVERuTVJnaWZmT0xNPSIsInJvbGUiOiJ1c2VyIiwibmV3c2xldHRlcl9zdWJfZW1haWwiOnRydWUsIm5ld3NsZXR0ZXJfc3ViX3Bob25lIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMy0wMy0xNVQwODo0MjozOC4zNzJaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0xNlQxMToxMzowOS40OTNaIiwiX192IjowLCJmaXJzdG5hbWUiOiJCaWxhd2FsIiwibGFzdG5hbWUiOiJBc2hyYWYiLCJ0aXRsZSI6Ik1yLiIsImdlbmRlciI6Ik1hbGUiLCJwaG9uZV9udW1iZXIiOiIzMzIyMDA1NTc3MSIsInBob25lX3ByZWZpeCI6Iis5MiJ9LCJpYXQiOjE2ODA3ODMyNDJ9.rGpxdv-1ZCDP5TXv9b-FeNDHl6cNoSTRBijWzwRv0_Q')
    localStorage.setItem('addressToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXNlcl9pZCI6ImluaXQiLCJfaWQiOiJpbml0IiwiYWRkcmVzc2VzIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsicmVxdWlyZSI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VyX2lkIjp0cnVlLCJhZGRyZXNzZXMiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjQxMTg0ZmZhN2VjM2ZmN2ZiZGRlMWFiIiwidXNlcl9pZCI6IjY0MTE4NGZlYTdlYzNmZjdmYmRkZTFhNyIsImFkZHJlc3NlcyI6W3sidGFnIjoic2hpcHBpbmciLCJhZGRyZXNzX3RpdGxlIjoiSG9tZSIsImZpcnN0bmFtZSI6IkJpbGF3YWwiLCJsYXN0bmFtZSI6IkFzaHJhZiIsImFkZHJlc3MiOiJEdWJhaSBjaG93aywgYWJjIGRpc3RyaWN0LCBzdHJlZXQgIzEyNCIsImFwdF9zdWl0ZSI6IiIsImNpdHkiOiJEdWJhaSIsImNvdW50cnkiOiJ1YWUiLCJwaG9uZV9wcmVmaXgiOiIrMTk3IiwicGhvbmVfbnVtYmVyIjoiMzMyMjAwNTU3NzEiLCJfaWQiOiI2NDEyZmEzNGE5MzA4NTBmNWQ5N2IyOTUifV0sImNyZWF0ZWRBdCI6IjIwMjMtMDMtMTVUMDg6NDI6MzkuNDgzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMTZUMTE6MTU6MDAuNTY0WiIsIl9fdiI6MH0sImlhdCI6MTY4MDc4MzI0Mn0.8_pi_fA5Kph7jzV74lHvrrd9B6ChcAEQ0tezAKl-8g4')
}, [])

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(77)
    })
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
  }, [router.events])
  return (
    <>
      <LoadingBar color='linear-gradient(90deg, #FAE892 0%, #B3903E 70%)' height={4} waitingTime={400} loaderSpeed={200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
      <ToastContainer className="toast" />
      <SessionProvider session={session}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </SessionProvider>
    </>
  )
}
export default dynamic(() => Promise.resolve(App), { ssr: false })