import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const data = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // Add more orders as needed
];

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
