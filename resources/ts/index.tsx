import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// コンポーネントのインポート
//import { NavBar } from './components/NavBar';
import { AdminRouter } from './components/admin/AdminRouter';
import { AdminDashBoard } from './components/admin/AdminDashBoard';
import { AdminHome } from './components/admin/AdminHome';
import { UserList } from './components/admin/UserList';

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
import { UserUpdate } from './components/auth/UserUpdate';
import { UserUnscribe } from './components/auth/UserUnscribe';
import { PasswordUpdate } from './components/auth/PasswordUpdate';
import { MyFlashCards } from './components/MyFlashCards';
import { CreateFlashCard } from './components/CreateFlashCard';
import { UpdateFlashCard } from './components/UpdateFlashCard';
import { FlashCard } from './components/FlashCard';
import { Card } from './components/Card';
import { UpdateCard } from './components/UpdateCard';
import { CategorySetting } from './components/CategorySetting';
import { Memory } from './components/Memory';
import { Quiz } from './components/Quiz';
import { QuizShuffle } from './components/QuizShuffle';


const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<div>404　ページが見つかりません。</div>} />

                {/* 権限ユーザーのみアクセス可能 */}
                <Route path='/' element={<AdminRouter />}>
                    <Route path="/" element={<AdminDashBoard />}>
                        <Route path="/admin" element={<AdminHome />} />
                        <Route path="/admin/user/list" element={<UserList />} />
                    </Route>
                </Route>


                {/* ゲストユーザーのみアクセス可能 */}
                <Route path='/' element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>} />
                </Route>


                <Route path="/register/complete" element={<RegisterComplete />}/>
                <Route path="/password/forgot" element={<PasswordForgot />} />
                <Route path="/password/reset" element={<PasswordReset />} />



                <Route path="/memory" element={<Memory />}>
                    <Route path=":flashcard_id" element={<Memory />} />
                </Route>
                <Route path="/quiz" element={<Quiz />}>
                    <Route path=":flashcard_id" element={<Quiz />} />
                </Route>
                <Route path="/quiz/s/" element={<QuizShuffle />}>
                    <Route path=":flashcard_id" element={<QuizShuffle />} />
                </Route>
                

                {/* 共通レイアウト適応 */}
                <Route path="/" element={<Layout />}>

                    {/* 認証ユーザーのみアクセス可能 */}
                    <Route path='/' element={<AuthRoute />}>
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/user/update" element={<UserUpdate />} />
                        <Route path="/user/password/update" element={<PasswordUpdate />} />
                        <Route path="/user/unscribe" element={<UserUnscribe />} />
                        <Route path="/flashcard/create" element={<CreateFlashCard />} />
                        <Route path="/flashcard/my" element={<MyFlashCards />} />
                        <Route path="/flashcard/update" element={<UpdateFlashCard />}>
                            <Route path=":flashcard_id" element={<UpdateFlashCard />} />
                        </Route>
                        <Route path="/card/update" element={<UpdateCard />}>
                            <Route path=":card_id" element={<UpdateCard />} />
                        </Route>
                        <Route path="/category/setting" element={<CategorySetting />} />
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