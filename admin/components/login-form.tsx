"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const router = useRouter();
    const [error, setError] = useState("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          option, // Thay thế bằng giá trị cụ thể của bạn
          password, // Thay thế bằng giá trị cụ thể của bạn
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push("/");

        // Nếu cần kiểm tra quyền hạn:
        // const role = response.data.role;
        // if (role === "admin") {
        //   router.push("/admin/dashboard");
        // } else {
        //   setError("Bạn không có quyền truy cập.");
        // }
      } else {
        setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">QUẢN LÝ SHOP HOA</CardTitle>
          {/* <CardDescription>Enter your email below to login to your account</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="option">Email - Tên đăng nhập</Label>
                <Input id="option" placeholder="" required value={option} onChange={(e) => setOption(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
