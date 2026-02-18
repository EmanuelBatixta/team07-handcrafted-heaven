import { fetchProducts } from "../lib/products";
import ProductFilter from "./ProductFilters";
import ProductForm from "../../components/ProductForm";
import { auth } from "@/auth";

export default async function ProductList() {
  const products = await fetchProducts();
  const session = await auth();

  return (
    <>
      <ProductFilter products={products} />

      {session && <ProductForm />}
    </>
  );
}