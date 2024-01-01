import App from "../Components/App";
import {
    createBrowserRouter,
} from "react-router-dom";
import MainPage from "../Components/MainPage";
import LoginPage from "../Components/Login";
import SignUpPage from "../Components/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainPage,
        loader:checkAccess,
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/signup",
        Component: SignUpPage,
    },
]);

function checkAccess() {
    return null;
}

export default router;