import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import AuthRoute from "@/routes/AuthRoute.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/home" element={<HomePage/>}/>
                </Route>
                <Route path="*" element={<AuthRoute/>}/>
            </Routes>
        </Router>
    )
}

export default App
