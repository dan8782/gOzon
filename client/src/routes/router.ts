import {
    createBrowserRouter, redirect,
} from "react-router-dom";
import MainPage from "../Components/MainPage";
import LoginPage from "../Components/Login";
import SignUpPage from "../Components/SignUp";
import CartPage from "../Components/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainPage,
        loader: checkAccess,
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/logout",
        loader: signout,
    },
    {
        path: "/signup",
        Component: SignUpPage,
    },
    {
        path:"/cart",
        Component: CartPage,
    }
]);

function checkAccess() {
    const storedData = localStorage.getItem('name'); // Replace 'yourKey' with the actual key you use in local storage
    if (storedData) {
        return null;
    } else {
        return redirect('/login');
    }
}

function clearNameFromLocalStorage() {
    try {
        localStorage.removeItem('name');
        console.log('Name cleared from localStorage.');
    } catch (error) {
        console.error('Error clearing name from localStorage:', error);
    }
}

function signout() {
    clearNameFromLocalStorage();
    return redirect('/login');
}

export default router;