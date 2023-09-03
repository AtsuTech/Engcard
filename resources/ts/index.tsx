import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// コンポーネントのインポート
//import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { RegisterComplete } from './components/auth/RegisterComplete';
import { PasswordForgot } from './components/auth/PasswordForgot';
import { PasswordReset } from './components/auth/PasswordReset';
import { AuthRoute } from './components/auth/AuthRoute';
import { GuestRoute } from './components/auth/GuestRoute';
import { Top } from './components/Top';
import { Index } from './components/Index';
import { DashBoard } from './components/DashBoard';


const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />

                {/* ゲストユーザーのみアクセス可能 */}
                <Route path='/' element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>} />
                </Route>


                <Route path="/register/complete" element={<RegisterComplete />}/>
                <Route path="/password/forgot" element={<PasswordForgot />} />
                <Route path="/password/reset" element={<PasswordReset />} />

                {/* 共通レイアウト適応 */}
                <Route path="/" element={<Layout />}>

                    {/* 認証ユーザーのみアクセス可能 */}
                    <Route path='/' element={<AuthRoute />}>
                        <Route path="/dashboard" element={<DashBoard />} />
                    </Route>

                    <Route path="/top" element={<Top />} />
                </Route>

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);