import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [ordering, setOrdering] = useState("price");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/products/", {
                params: { ordering, search },
            });
            setProducts(res.data.results || []);
        } catch (err) {
            console.error("Ошибка загрузки товаров", err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };
/*
пасхалка для проверяющих)
Улыбнитесь
*/
    useEffect(() => {
        fetchProducts();
    },[ordering, search]);

    return (
    <div className="p-4 bg-white rounded shadow mt-4">
        <div className="flex items-center justify-between mb-4">
            <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-1/2"/>
            
            <button
            onClick={()=>
                setOrdering((prev) =>
                    prev === "price" ? "-price" : "price")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Сортировать по цене {ordering === "price" ? "↓" : "↑"}
            </button>
        </div>
        {loading ? (
            <p className="text-gray-500">Загрузка...</p>
        ):(
        <table className="w-full table-auto border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Название</th>
                    <th className="p-2 border">Цена</th>
                    <th className="p-2 border">Дата</th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="3" className="text-center p-4 text-gray-500">
                            Ничего не найдено
                        </td>
                    </tr>
                ):(
                    products.map((p) => (
                    <tr key={p.id}>
                        <td className="p-2 border">{p.title}</td>
                        <td className="p-2 border">{p.price} ₽</td>
                        <td className="p-2 border">{new Date(p.created_at).toLocaleString()}</td>
                    </tr>
                    ))
                )}
            </tbody>
        </table>
        )}
    </div>
    );
}
