import { Folder } from "lucide-react";

type Category = {
  _id: number;
  name: string;
  description?: string;
  img_url?: string;
  priority: number;
  parent_id: number | null;
  children?: Category[];
};

type CategoryTreeProps = {
  categories: Category[];
  level?: number;
};

export function CategoryTree({ categories, level = 0 }: CategoryTreeProps) {
  return (
    <ul className={`space-y-1 ${level > 0 ? "ml-4" : ""}`}>
      {categories.map((category) => (
        <li key={category._id} className="space-y-1">
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
            <Folder className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{category.name}</span>
            {/* <p className="font-semibold">Số sản phẩm: </p> */}
            {category.description && <span className="text-sm text-gray-500">({category.description})</span>}
          </div>
          {category.children && category.children.length > 0 && <CategoryTree categories={category.children} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
}
