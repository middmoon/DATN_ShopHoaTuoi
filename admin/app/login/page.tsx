import { LoginForm } from "@/components/login/login-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const cookieStore = cookies();

  console.log(cookieStore);

  const token = cookieStore.get("token");
  if (token) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
