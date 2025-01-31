"use client";

import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/page-header";
import { Loader2 } from "lucide-react";
import { CategoryTree } from "@/components/product-category/category-tree";
import { api } from "@/utils/api";

type Category = {
  _id: number;
  name: string;
  description?: string;
  img_url?: string;
  priority: number;
  parent_id: number | null;
  children: Category[];
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get("/product-categories");
  console.log(`Dataaaaaaaaa: ${response.data.data}`);
  return response.data.data;
};

const buildCategoryTree = (categories: Category[]): Category[] => {
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];

  categories.forEach((category) => {
    categoryMap.set(category._id, { ...category, children: [] });
  });

  categories.forEach((category) => {
    if (category.parent_id === null) {
      rootCategories.push(categoryMap.get(category._id)!);
    } else {
      const parent = categoryMap.get(category.parent_id);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(categoryMap.get(category._id)!);
      }
    }
  });

  return rootCategories;
};

export default function ProductCategoryPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sản phẩm", href: "/dashboard/products" },
    { label: "Danh mục sản phẩm" },
  ];

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categoryTree = categories ? buildCategoryTree(categories) : [];

  return (
    <div className="space-y-6">
      <PageHeader items={breadcrumbItems} />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Danh mục sản phẩm</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500">Error loading categories: {(error as Error).message}</div>
        ) : (
          <CategoryTree categories={categoryTree} />
        )}
      </div>
    </div>
  );
}
