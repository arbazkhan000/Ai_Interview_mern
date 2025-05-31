import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./_components/Dashboard/Home";
import CreateSessionsModal from "./_components/Dashboard/SessionsModel";
import SingleSession from "./_components/Dashboard/SingleSession";
import Header from "./_components/Header";
import "./App.css";
import Login from "./auth/login";
import Signup from "./auth/Signup";
import IndexPage from "./layout/IndexPage";
import Footer from "./_components/Footer";

function App() {
    function ProtectedRoute({ children }) {
        const token = localStorage.getItem("token");
        return token ? children : <Navigate to="/" replace />;
    }
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/session/:id"
                    element={
                        <ProtectedRoute>
                            <SingleSession />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sessions"
                    element={
                        <ProtectedRoute>
                            <CreateSessionsModal />
                        </ProtectedRoute>
                    }
                />
                dashboard
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
