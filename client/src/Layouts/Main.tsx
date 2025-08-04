import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function Layout() {
    return (
        <section className="max-w-3xl mx-auto">
            <Header />
            <Outlet />

        </section>
    )
}
