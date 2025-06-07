import { useState } from"react";
import axios from"../api/axios";

export default function ParseForm({onSuccess}){
    const [formData, setFormData] = useState({
        query:"",
        minPrice:"",
        maxPrice:"",
        color:""
    });
    
    const [loading,setLoading] =useState(false);
    const [taskId,setTaskId]= useState(null);
    const [error,setError]=useState("");
    
    const handleChange =(e) => {
        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value,
        })
        );
    };

    const handleSubmint = async (e)=> {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("/parse/", formData);
            setTaskId(response.data.task_id);
            onSuccess?.(response.data.task_id);
        } catch (err){
            setError("Ошибка при запуске парсинга");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmint} 
        className="p-4 border rounded shadow max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold">Параметры парсинга</h2>

            <input type="text"
            name="query"
            placeholder="name"
            value={formData.query}
            onChange={handleChange}
            className="w-full p2 border rounded"
            required/>

            <div className="flex gap-2">
                <input type="number"
                name="minPrice"
                placeholder="Мин цена"
                value={formData.minPrice}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"/>

                <input type="number"
                name="maxPrice"
                placeholder="Макс цена"
                value={formData.maxPrice}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"/>
            </div>
            <input type="text"
                name="color"
                placeholder="цвет"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-2 border rounded"/>
            <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded disabled:opacity-50">
                {loading ? "Запуск.." : "Запустить парсинг"}</button>
            
            {taskId && <p className="text-green-600"> Задача отправлена id{taskId}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
}