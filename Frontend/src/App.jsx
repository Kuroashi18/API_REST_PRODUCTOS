import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './App.css';

function App() {
    const [token, setToken] = useState(null);

    return (
        <div style={{ maxWidth: 480, margin: '2rem auto', fontFamily: "sans-serif" }}>
            <h1>Productos</h1>
            {!token ? (
                <LoginForm onLoggedIn={setToken} />
            ) : (
                <>
                    <p style={{ color: 'seagreen' }}>Sesión iniciada ✓</p>
                    <button onClick={() => setToken(null)} style={{ margin: '1rem 0' }}>
                        Cerrar sesión
                    </button>

                    <ProductForm token={token} />
                </>
            )}

            <hr />
            <h2>Lista de productos</h2>
            <ProductList />
        </div>
    )
}
export default App
