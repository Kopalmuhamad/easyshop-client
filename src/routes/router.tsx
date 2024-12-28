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
import { lazy, Suspense } from "react";
import ProtectedRoute from "./protected-route";
import AdminProtectedRoute from "./admin-protected-route";
import DashboardLayout from "@/layouts/dashboard-layout";
import Loader from "@/components/shared/loader";
import CartsPage from "@/pages/carts-page";
import NewArrivalPage from "@/pages/new-arrival-page";
import FeaturesPage from "@/pages/features-page";
import BestSellerPage from "@/pages/best-seller-page";
import ProductsByCategoryPage from "@/pages/products-by-category-page";

const ProfilePage = lazy(() => import("@/pages/profile-page"));
const CreateAddressPage = lazy(() => import("@/pages/create-address-page"));
const AddressPage = lazy(() => import("@/pages/address-page"));
const HomePage = lazy(() => import("@/pages/home-page"));
const AdminHomePage = lazy(() => import("@/pages/admin-page"));
const AdminProductsPage = lazy(
  () => import("@/pages/admin-page/admin-products-page")
);
const AdminCreateProductPage = lazy(
  () => import("@/pages/admin-page/admin-create-product-page")
);
const AdminCategoriesPage = lazy(
  () => import("@/pages/admin-page/admin-categories-page")
);
const AdminCreateCategoryPage = lazy(
  () => import("@/pages/admin-page/admin-create-category-page")
);
const CollectionsPage = lazy(() => import("@/pages/collection-page"));
const DetailProductPage = lazy(() => import("@/pages/detail-product-page"));

const routes = createRoutesFromElements(
  <Route>
    {/* Public Route and not use Layout */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/verify" element={<VerifyPage />} />
    </Route>

    <Route element={<MainLayout />}>
      {/* Main Layout And Public Route */}
      <Route path="/" element={<HomePage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/collections/new-arrivals" element={<NewArrivalPage />} />
      <Route path="/collections/features" element={<FeaturesPage />} />
      <Route path="/collections/best-seller" element={<BestSellerPage />} />
      <Route
        path="/collections/detail/:productId"
        element={<DetailProductPage />}
      />
      <Route
        path="/collections/category/:categorySlug"
        element={<ProductsByCategoryPage />}
      />

      {/* Main Layout And Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/address/create" element={<CreateAddressPage />} />
        <Route path="/profile/address" element={<AddressPage />} />
        <Route path="/profile/carts" element={<CartsPage />} />
      </Route>
    </Route>

    {/* Dashboard Layout and Admin Protected Route */}
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
  </Route>
);

const router = createBrowserRouter(routes);

const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="relative w-screen h-screen">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader size="lg" />
          </div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
