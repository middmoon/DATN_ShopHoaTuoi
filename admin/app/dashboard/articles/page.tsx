// import { RichTextEditor } from "@/components/article/richtext-editor";
import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }, { label: "Bài viết" }];
  return (
    <>
      <PageHeader items={breadcrumbItems}></PageHeader>
      <div className="container mx-auto p-10">{/* <RichTextEditor /> */}</div>
    </>
  );
}
