import { PageHeader } from "@/components/page-header";
import AddProductForm from "@/components/products/add/add-product-form";

export default function AddProductPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
