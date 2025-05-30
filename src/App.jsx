import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Book from "./pages/Book";
import Test from "./pages/Test";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<Book />} /> 

        </Route>
      </Routes>
    </Router>
  );
}
