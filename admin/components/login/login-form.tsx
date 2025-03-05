"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/utils/api";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/auth/login/system",
        { option, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/");
      } else {
        setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">QUẢN LÝ SHOP HOA</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="option">Email - Tên đăng nhập</Label>
                <Input id="option" placeholder="" required value={option} onKeyDown={handleKeyDown} onChange={(e) => setOption(e.target.value)} />
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
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
