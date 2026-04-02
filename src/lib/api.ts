import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const API = axios.create({
    baseURL: "https://api-dev.ziyadbooks.com/api/v1",
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});

export const getProducts = async () => {
    try {
        const res = await API.get("/ecommerce/auth/products/all/category");
        return res.data;
    } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        throw error;
    }
};