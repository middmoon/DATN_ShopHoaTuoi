import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const data = [
  {
    id: "1",
    title: "Top 10 Spring Flowers",
    author: "Jane Doe",
    publishDate: "2023-03-15",
  },
  {
    id: "2",
    title: "How to Care for Cut Flowers",
    author: "John Smith",
    publishDate: "2023-04-02",
  },
  // Add more articles as needed
];

export default function ArticlesPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
