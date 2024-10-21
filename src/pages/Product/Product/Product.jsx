import { Helmet } from "react-helmet-async";
import ProductCard from "../ProductCard/ProductCard";

const Product = () => {
  return (
    <section>
      <Helmet>
        <title>Bondon BD | Product</title>
      </Helmet>
      <ProductCard />
    </section>
  );
}

export default Product
