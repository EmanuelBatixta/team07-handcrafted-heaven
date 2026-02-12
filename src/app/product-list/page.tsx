import { fetchProducts } from "../lib/products";
import ProductFilter from "./ProductFilters";

export default async function ProductList() {
  const products = await fetchProducts();

  //return <ProductFilter products={products} />;
}