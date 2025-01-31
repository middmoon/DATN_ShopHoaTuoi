import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/utils/react-query-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-0 pt-0">{children}</div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
