import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// コンポーネントのインポート
//import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Top } from './components/Top';
import { Index } from './components/Index';


const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />

                {/* 共通レイアウト適応 */}
                <Route path="/" element={<Layout />}>
                    <Route path="/top" element={<Top />} />
                </Route>

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);