"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Inventory = {
  id: string;
  name: string;
  stock: number;
  price: number;
};

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
];
