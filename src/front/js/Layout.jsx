import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { ProtectedRoutes } from "./component/ProtectedRoutes.jsx";
// Custom pages / views
import { Home } from "./pages/Home.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Countries } from "./pages/Countries.jsx";
import { Post } from "./pages/Post.jsx";
import { Posts } from "./pages/Posts.jsx";
import { Settings } from "./pages/Settings.jsx";


//Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const [dark, setDark] = useState(() => {
        const storedMode = localStorage.getItem("darkMode");
        return storedMode ? JSON.parse(storedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(dark));
    }, [dark]);

    return (
        <div className="d-flex flex-column min-vh-100" id={dark ? 'dark' : 'light'}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar dark={dark} setDark={setDark} />
                    <Routes>
                        <Route element={<Home dark={dark} />} path="/" />
                        <Route element={<Signup dark={dark} />} path="/signup" />
                        <Route element={<Login dark={dark} />} path="/login" />
                        <Route element={<ProtectedRoutes />}>
                            <Route element={<Profile dark={dark} />} path="/profile" />
                            <Route element={<Profile dark={dark} />} path="/user/:id" />
                            <Route element={<Countries dark={dark} />} path="/countries" />
                            <Route element={<Posts dark={dark} />} path="/posts" />
                            <Route element={<Post dark={dark} />} path="/post/:id" />
                            <Route element={<Settings dark={dark} />} path="/settings" />
                        </Route>
                        <Route element={<h1>Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);