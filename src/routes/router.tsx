import MainLayout from "@/layouts/main-layout";
import LoginPage from "@/pages/login-page";
import RegisterPage from "@/pages/register-page";
import VerifyPage from "@/pages/verify-page";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProfilePage from "@/pages/profile-page";
import CreateAddressPage from "@/pages/create-address-page";
import AddressPage from "@/pages/address-page";
import HomePage from "@/pages/home-page";
import ProtectedRoute from "./protected-route";
import AdminProtectedRoute from "./admin-protected-route";
import DashboardLayout from "@/layouts/dashboard-layout";
import AdminHomePage from "@/pages/admin-page";
import AdminProductsPage from "@/pages/admin-page/admin-products-page";
import AdminCreateProductPage from "@/pages/admin-page/admin-create-product-page";
import AdminCategoriesPage from "@/pages/admin-page/admin-categories-page";
import AdminCreateCategoryPage from "@/pages/admin-page/admin-create-category-page";

const routes = createRoutesFromElements(
  <Route>
    <Route element={<MainLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/address/create" element={<CreateAddressPage />} />
        <Route path="/profile/address" element={<AddressPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
    </Route>
    <Route element={<DashboardLayout />}>
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/add-product" element={<AdminCreateProductPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route
          path="/admin/add-category"
          element={<AdminCreateCategoryPage />}
        />
      </Route>
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/verify" element={<VerifyPage />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
