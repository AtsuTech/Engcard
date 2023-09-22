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
import { Home } from './components/Home';
import { Index } from './components/Index';
import { DashBoard } from './components/DashBoard';
import { MyFlashCards } from './components/MyFlashCards';
import { CreateFlashCard } from './components/CreateFlashCard';
import { UpdateFlashCard } from './components/UpdateFlashCard';
import { FlashCard } from './components/FlashCard';
import { Card } from './components/Card';
import { UpdateCard } from './components/UpdateCard';


const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<div>404　ページが見つかりません。</div>} />
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
                        <Route path="/flashcard/create" element={<CreateFlashCard />} />
                        <Route path="/flashcard/my" element={<MyFlashCards />} />
                        <Route path="/flashcard/update" element={<UpdateFlashCard />}>
                            <Route path=":flashcard_id" element={<UpdateFlashCard />} />
                        </Route>
                        <Route path="/card/update" element={<UpdateCard />}>
                            <Route path=":card_id" element={<UpdateCard />} />
                        </Route>
                    </Route>

                    <Route path="/home" element={<Home />} />

                    <Route path="/flashcard" element={<FlashCard />}>
                        <Route path=":flashcard_id" element={<FlashCard />} />
                    </Route>

                    <Route path="/card" element={<Card />}>
                        <Route path=":card_id" element={<Card />} />
                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);