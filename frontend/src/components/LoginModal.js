import {useState,useRef,useEffect} from "react";
import axios from "../api/axios";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef();

  useEffect(()=> {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
      const onEsc=(e)=> {if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onEsc);
      return () =>{
        window.removeEventListener("keydown", onEsc);
        document.body.style.overflow = "";
    };
}
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      await axios.post("/login/", form);
      onLogin?.();
      onClose();
      setForm({ username:"", password:""});
    } catch (err) {
      setError(
        err?.response?.status === 401
          ? "Неверный логин или пароль"
          : "Ошибка входа. Попробуйте ещё раз"
      );
    } finally{
      setPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      onMouseDown={onClose}>
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-fadeIn"
        onMouseDown={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-center">Вход</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input ref={inputRef}
            name="username"
            type="text"
            placeholder="Логин"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:border-blue-500"
            disabled={pending}
            required/>
          <input name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring focus:border-blue-500"
            disabled={pending}
            required/>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-between gap-2">
            <button type="submit"
              disabled={pending}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              {pending ? "Вход..." : "Войти"}</button>
            <button type="button"
              onClick={onClose}
              disabled={pending}
              className="text-gray-500 px-3 py-2 hover:underline">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}
