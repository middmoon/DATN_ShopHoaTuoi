import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const data = [
  {
    id: "1",
    name: "Red Rose Bouquet",
    price: 29.99,
    category: "Bouquets",
  },
  {
    id: "2",
    name: "Tulip Arrangement",
    price: 39.99,
    category: "Arrangements",
  },
  // Add more products as needed
];

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
