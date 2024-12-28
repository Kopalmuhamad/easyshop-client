import DetailProductView from "@/views/detail-product-view";
import { useParams } from "react-router-dom";

const DetailProductPage = () => {
  const { productId } = useParams();
  return <DetailProductView productId={productId!} />;
};

export default DetailProductPage;
