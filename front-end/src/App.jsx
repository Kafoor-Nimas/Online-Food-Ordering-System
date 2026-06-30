import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import AllProducts from "./pages/Products";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

function AppContent() {
  const { showUserLogin } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      {showUserLogin && <Login />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;