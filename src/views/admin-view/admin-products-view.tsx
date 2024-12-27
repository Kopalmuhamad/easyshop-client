import AdminProductCard from "@/components/moleculs/admin-product-card";
import { useProducts } from "@/features/product/hooks/use-products";

const AdminProductsView = () => {
  const { data: productsData } = useProducts();

  const { products } = productsData || {};

  return (
    <div className="space-y-4 mt-2">
      <header>
        <h1 className="text-2xl font-semibold">Products</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <AdminProductCard key={product._id} product={product} />
        ))}
      </main>
    </div>
  );
};

export default AdminProductsView;
