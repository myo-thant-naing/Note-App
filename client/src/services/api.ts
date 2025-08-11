import axios from "axios";

let API_URL = "";
if (import.meta.env.VITE_MODE === "development") {
    API_URL = import.meta.env.VITE_LOCAL_API_URL;
}
if (import.meta.env.VITE_MODE === "production") {
    API_URL = import.meta.env.VITE_API_URL;
}
const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
export { API_URL }
export default API;
