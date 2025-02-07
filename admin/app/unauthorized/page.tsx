import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Truy cập trái phép.</h1>
        <p className="text-xl text-gray-600 mb-8">Bạn không có quyền truy cập vào trang này</p>
        <Button asChild>
          <Link href="/dashboard">Trở về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
