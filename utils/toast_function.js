import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function toaster (type, msg) {
    toast(msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: type,
        progress: undefined,
        theme: "light",
        transition: Slide
    })
}