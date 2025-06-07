import React, { useEffect, useState } from "react";
import ParseForm from "./components/ParseForm";
import LoginModal from "./components/LoginModal";
import ProductTable from "./components/ProductTable";
import axios from "./api/axios";

const App = () => {
	const [isLoggedIn, setIsLoddedIn] = useState(false);
	const [showLogin, setShowLogin]= useState(false);
	const [showParser, setShowParser] = useState(true);

	useEffect(()=>{
		axios.get("auth-status/")
		.then(res=>{
			if (res.data.authenticated){
				setIsLoddedIn(true);
			}
		})
		.catch(()=> setIsLoddedIn(false));
	})
	const handleLogin= ()=> setIsLoddedIn(true);
	const handleLogout = async () => {
		try {
			await axios.post("/logout/");   // автоматически подставит X-CSRFToken
		} catch (err) {
			console.error("Logout failed", err);
		} finally {
			setIsLoddedIn(false);
		}
	};
	return (
		<div className="min-h-screen p-6 bg-gray-100">
			<header className="flex justify-between items-center mb-6">
				<h1>Ozon Parser UI</h1>
			</header>
			<div> 
				{isLoggedIn && (
					<div className="mt-4">
						<button onClick={() => setShowParser(!showParser)}
							className="text-sm px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
							{showParser ? "Показать товары" : "Скрыть товары / Показать парсер"}
						</button>
					</div>
				)}

				{isLoggedIn ? (
					<button onClick={handleLogout}
					className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
						Выйти
					</button>
					):(
					<button
					onClick={() => setShowLogin(true)}
					className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-700">
						Войти
						</button>
					)}
			</div>
			{isLoggedIn ? (
				<>
				{showParser ? (
					<ParseForm />
				):(
					<ProductTable />
					)}
					</>
				):(
					<div className="text-gray-600 text-sm">
						<p>Пожалуйста, войдите в систему.</p>
						<p className="mt-1 text-xs text-gray-400">
							Для теста: <strong>admin</strong> / <strong>admin</strong>
						</p>
					</div>
				)}

			<LoginModal isOpen={showLogin}
			onClose={() => setShowLogin(false)}
			onLogin={handleLogin}/>
		</div>
	);
};

export default App;
