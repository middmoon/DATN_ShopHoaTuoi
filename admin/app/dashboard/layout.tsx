import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const myCookie = cookieStore.get("roles");

  const roles: string[] = myCookie?.value ? JSON.parse(myCookie.value.replace(/^j:/, "")) : [];

  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar roles={roles} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-0 p-0 pt-0">{children}</div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster position="top-right" richColors expand={true} />
      </body>
    </html>
  );
}
