"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { MultiSelect } from "@/components/mutil-select";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  unit: z.string().min(1, "Unit is required"),
  description: z.string().min(1, "Description is required"),
  wholesale_price: z.number().min(0, "Wholesale price must be non-negative"),
  retail_price: z.number().min(0, "Retail price must be non-negative"),
  status: z.enum(["Còn hàng", "Hết hàng", "Ngưng kinh doanh"]),
  is_featured: z.boolean(),
  stock_quantity: z.number().int().min(0, "Stock quantity must be non-negative"),
  categories: z.array(z.number()).min(1, "At least one category is required"),
  is_public: z.boolean(),
});

const categories = [
  { _id: 1, name: "flower", parent_id: null },
  { _id: 2, name: "flower for lover", parent_id: 1 },
  { _id: 3, name: "gift", parent_id: 1 },
];

export default function AddProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const response = await fetch("/api/categories");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch categories");
  //       }
  //       const data = await response.json();
  //       setCategories(data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       toast.error("Error fetching categories. Please refresh the page.");
  //     }
  //   }

  //   fetchCategories();
  // }, []);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      unit: "",
      description: "",
      wholesale_price: 0,
      retail_price: 0,
      status: "Còn hàng",
      is_featured: false,
      stock_quantity: 0,
      categories: [],
      is_public: false,
    },
  });

  async function onSubmit(data: z.infer<typeof productSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully. The new product has been added to the database.");

      router.push("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"></form>
    </Form>
  );
}
