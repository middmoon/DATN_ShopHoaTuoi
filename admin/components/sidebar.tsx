import Link from "next/link";
import { Home, Package, ShoppingCart, Flower, FileText } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Flower },
  { name: "Articles", href: "/articles", icon: FileText },
];

export function Sidebar() {
  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <span className="flex items-center space-x-2 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
