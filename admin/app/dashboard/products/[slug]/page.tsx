import { notFound } from "next/navigation";
import { api } from "@/utils/api";
import { ProductDetail } from "@/components/products/product-detail";
import { PageHeader } from "@/components/page-header";

export async function getProductDetail(params: string) {
  const res = await api.get(`/product/${params}`);

  if (res.status === 404) {
    return notFound(); // 404 page
  }

  return res.data.data;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductDetail(params.slug);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sản phẩm", href: "/dashboard/products" },
    { label: `${product.name}` },
  ];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">
        <ProductDetail product={product} />
      </div>
    </>
  );
}
