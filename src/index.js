import React from "react";
import ReactDOM from "react-dom/client";
import { Footer, Navbar } from "./components/layout";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/admin/products/ProductList";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { AppProvider } from "./AppContext"; // Import AppProvider instead of AppContext directly
import { AdminRoute, AuthenticatedUserRoute } from "./components/authorization";
import UserProfile from "./pages/UserProfile";
import UserList from "./pages/admin/users/UserList";
import UserDetails from "./pages/admin/users/UserDetails";

// Keep your existing App component structure
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/profile"
          element={
            <AuthenticatedUserRoute>
              <UserProfile />
            </AuthenticatedUserRoute>
          }
        />

        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/details/:id"
          element={
            <AdminRoute>
              <UserDetails />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// Wrap the App with AppProvider in your index.js to handle the app-wide context
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
