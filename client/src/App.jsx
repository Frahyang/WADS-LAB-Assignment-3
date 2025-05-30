import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ActivateAccount from "./pages/ActivateAccount";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />

        {/* Activation route */}
        <Route path="/user/activate/:token" element={<ActivateAccount />} />

        <Route path="/signin" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />

        

        {/* prevent user after login */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
