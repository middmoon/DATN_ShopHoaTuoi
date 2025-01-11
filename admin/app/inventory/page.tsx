import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const data = [
  {
    id: "1",
    name: "Red Rose",
    stock: 150,
    price: 2.99,
  },
  {
    id: "2",
    name: "Tulip",
    stock: 100,
    price: 1.99,
  },
  {
    id: "3",
    name: "Sunflower",
    stock: 75,
    price: 3.49,
  },
  // Add more inventory items as needed
];

export default function InventoryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
