import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/page-header";

export default function Page() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/" }];

  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>

      {/* <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 z-10 bg-white shadow-md">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header> */}
    </>

    // <SidebarProvider>
    //   <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 z-10 bg-white shadow-md">
    //     <div className="flex items-center gap-2 px-4">
    //       <SidebarTrigger className="-ml-1" />
    //       <Separator orientation="vertical" className="mr-2 h-4" />
    //       <Breadcrumb>
    //         <BreadcrumbList>
    //           <BreadcrumbItem className="hidden md:block">
    //             <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
    //           </BreadcrumbItem>
    //         </BreadcrumbList>
    //       </Breadcrumb>
    //     </div>
    //   </header>

    //   <div className="flex min-h-[100vh] flex-col p-6">
    //     <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
    //     <p>Here is some content for the homepage.</p>
    //     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, quia. Rem, deserunt. Quae mollitia aperiam voluptatum autem omnis beatae
    //     quibusdam reiciendis? Corporis iste eum nostrum dolor aliquam, nisi repudiandae quam.
    //   </div>

    // </SidebarProvider>

    // <div className="flex min-h-[100vh] flex-col p-6">
    //   <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
    //   <p>Here is some content for the homepage.</p>
    //   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, quia. Rem, deserunt. Quae mollitia aperiam voluptatum autem omnis beatae
    //   quibusdam reiciendis? Corporis iste eum nostrum dolor aliquam, nisi repudiandae quam.
    // </div>
  );
}
