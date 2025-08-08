import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bounce, ToastContainer } from "react-toastify"


export default function Layout() {
    return (
        <section className="max-w-3xl mx-auto">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Header />
            <Outlet />
            <Footer />


        </section>
    )
}
