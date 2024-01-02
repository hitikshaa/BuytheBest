import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./Store/UserContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <UserProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
