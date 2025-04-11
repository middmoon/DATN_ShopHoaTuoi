"use client";

import type React from "react";
import { useState, useCallback } from "react"; // Import useCallback
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  Code,
  Heading1,
  Heading2,
  LinkIcon,
  Unlink,
  Loader2, // Thêm Unlink và Loader2
} from "lucide-react";
import { api } from "@/utils/api";

export function RichTextEditor() {
  // Sử dụng HTML cho state nội bộ và preview cho đơn giản
  // Nhưng khi submit sẽ lấy JSON từ editor
  const [htmlContent, setHtmlContent] = useState<string>("<p>Bắt đầu viết nội dung của bạn ở đây...</p>");
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state loading

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true, // Cho phép base64 để upload/preview dễ dàng hơn nếu muốn
        // Nếu backend xử lý base64, giữ lại. Nếu backend yêu cầu URL, cần xử lý upload riêng.
        // Giả sử JSON sẽ chứa src là base64 hoặc URL đã có.
      }),

      Link.configure({
        openOnClick: false, // Không mở link khi click trong editor
        autolink: true, // Tự nhận diện link
        HTMLAttributes: {
          // Thêm class cho link để dễ style
          class: "text-primary underline cursor-pointer",
          target: "_blank", // Mở link ở tab mới
          rel: "noopener noreferrer nofollow", // Thuộc tính bảo mật và SEO
        },
      }),
    ],
    content: htmlContent, // Khởi tạo editor với HTML ban đầu
    onUpdate: ({ editor }) => {
      // Cập nhật state HTML để dùng cho preview (hoặc các mục đích khác nếu cần)
      setHtmlContent(editor.getHTML());
    },
  });

  // Hàm xử lý Link (giữ nguyên hoặc cải tiến nếu cần)
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Nhập URL", previousUrl);

    if (url === null) return; // Hủy

    if (url === "") {
      // Gỡ link nếu URL rỗng
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Thêm/Cập nhật link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
  }, [editor]);

  // Hàm thêm ảnh từ URL (giữ lại nếu cần)
  const addImageByUrl = () => {
    if (!editor || isSubmitting) return;
    const url = window.prompt("Nhập URL của ảnh:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Hàm xử lý khi chọn file ảnh (chèn base64 vào editor)
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && editor && !isSubmitting) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && editor) {
          editor
            .chain()
            .focus()
            .setImage({ src: event.target.result as string }) // Chèn base64 src
            .run();
        }
      };
      reader.onerror = (error) => {
        console.error("Lỗi đọc file:", error);
        alert("Không thể đọc file ảnh.");
      };
      reader.readAsDataURL(file);
      e.target.value = ""; // Reset input
    }
  };

  // --- Hàm Submit gửi JSON ---
  const handleSubmit = async () => {
    if (!editor || isSubmitting) return;

    const currentTitle = title.trim();
    const currentJsonContent = editor.getJSON(); // Lấy nội dung dạng JSON

    // --- Kiểm tra nội dung rỗng ---
    // JSON rỗng thường là { type: 'doc', content: [{ type: 'paragraph' }] }
    const isEmptyContent =
      !currentJsonContent ||
      !currentJsonContent.content ||
      (currentJsonContent.content.length === 1 &&
        !currentJsonContent.content[0].content && // Kiểm tra node paragraph có content không
        currentJsonContent.content[0].type === "paragraph");

    if (!currentTitle) {
      alert("Vui lòng nhập tiêu đề bài viết.");
      return;
    }
    if (isEmptyContent) {
      alert("Vui lòng nhập nội dung bài viết.");
      return;
    }
    // --- Kết thúc kiểm tra ---

    setIsSubmitting(true);

    const payload = {
      title: currentTitle,
      content: currentJsonContent, // Gửi đối tượng JSON trực tiếp
      // user_id: 1 // Thêm user_id nếu cần, lấy từ context hoặc session
    };

    try {
      // Thay đổi '/api/posts' bằng endpoint API thực tế của bạn
      const response = await api.post("/api/posts", payload, {
        headers: {
          "Content-Type": "application/json", // Đảm bảo gửi đi là JSON
        },
      });

      console.log("API Response:", response.data);
      alert("Bài viết đã được gửi thành công!");
      // Cập nhật HTML state để preview hiển thị đúng nội dung vừa submit
      setHtmlContent(editor.getHTML());
      setShowPreview(true); // Hiển thị preview
    } catch (error) {
      console.error("Lỗi khi gửi bài viết:", error);
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- Kết thúc Hàm Submit ---

  // Hàm Reset Editor
  const resetEditor = () => {
    if (editor) {
      const initialContent = "<p>Bắt đầu viết nội dung của bạn ở đây...</p>";
      editor.commands.setContent(initialContent, true); // Set content và trigger update
      setHtmlContent(initialContent); // Reset state HTML
      setShowPreview(false);
      setTitle("");
    }
  };

  if (!editor) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Đang tải trình soạn thảo...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!showPreview ? (
        <>
          {/* Input Tiêu đề */}
          <div className="mb-4">
            <label htmlFor="article-title" className="block text-sm font-medium mb-1 text-foreground">
              Tiêu đề bài viết
            </label>
            <input
              id="article-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              disabled={isSubmitting}
            />
          </div>

          {/* Editor và Toolbar */}
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="bg-muted p-2 flex flex-wrap gap-1 border-b border-border">
              {/* Toolbar Buttons - thêm disabled={isSubmitting} */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run() || isSubmitting}
                className={editor.isActive("bold") ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="In đậm"
              >
                {" "}
                <Bold className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run() || isSubmitting}
                className={editor.isActive("italic") ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="In nghiêng"
              >
                {" "}
                <Italic className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={setLink}
                disabled={isSubmitting}
                className={editor.isActive("link") ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="Thêm/Sửa liên kết"
              >
                {" "}
                <LinkIcon className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive("link") || isSubmitting}
                className="text-muted-foreground disabled:text-muted-foreground/50"
                title="Gỡ liên kết"
              >
                {" "}
                <Unlink className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run() || isSubmitting}
                className={editor.isActive("heading", { level: 1 }) ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="Tiêu đề 1"
              >
                {" "}
                <Heading1 className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run() || isSubmitting}
                className={editor.isActive("heading", { level: 2 }) ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="Tiêu đề 2"
              >
                {" "}
                <Heading2 className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run() || isSubmitting}
                className={editor.isActive("bulletList") ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="Danh sách (bullet)"
              >
                {" "}
                <List className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run() || isSubmitting}
                className={editor.isActive("orderedList") ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="Danh sách (số)"
              >
                {" "}
                <ListOrdered className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                disabled={!editor.can().chain().focus().toggleCodeBlock().run() || isSubmitting}
                className={editor.isActive("codeBlock") ? "bg-primary/20 text-primary" : "text-muted-foreground"}
                title="Khối mã"
              >
                {" "}
                <Code className="h-4 w-4" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={addImageByUrl}
                disabled={isSubmitting}
                title="Thêm ảnh từ URL"
                className="text-muted-foreground"
              >
                {" "}
                <ImageIcon className="h-4 w-4" />{" "}
              </Button>
              <div className="relative inline-flex items-center">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" disabled={isSubmitting} title="Tải ảnh lên từ máy">
                  {" "}
                  Tải ảnh lên{" "}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-label="Tải ảnh lên từ thiết bị"
                />
              </div>
            </div>
            {/* Editor Content Area */}
            <EditorContent
              editor={editor}
              className={`p-4 min-h-[300px] prose dark:prose-invert max-w-none focus:outline-none text-foreground bg-background ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetEditor} disabled={isSubmitting}>
              Làm lại
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Gửi bài
            </Button>
          </div>
        </>
      ) : (
        // Preview Section (vẫn dùng HTML từ state `htmlContent`)
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Xem trước bài viết</h2>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Chỉnh sửa
            </Button>
          </div>
          <Separator />
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Phần thông tin tóm tắt giữ nguyên, tính toán từ htmlContent */}
              <div className="bg-muted p-4 border-b border-border">
                {/* ... ( giữ nguyên code hiển thị title, word count, image count, link count tính từ htmlContent) ... */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">Thông tin bài viết</h3>
                    <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Tiêu đề</p>
                      <p className="text-sm font-medium text-foreground">{title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Số từ</p>
                      <p className="text-sm font-medium text-foreground">
                        {htmlContent
                          ? htmlContent
                              .replace(/<[^>]*>/g, " ") // Loại bỏ thẻ HTML
                              .split(/\s+/) // Tách theo khoảng trắng
                              .filter(Boolean).length // Lọc bỏ từ rỗng và đếm
                          : 0}{" "}
                        từ
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Số ảnh</p>
                      <p className="text-sm font-medium text-foreground">{htmlContent ? (htmlContent.match(/<img[^>]*>/g) || []).length : 0} ảnh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Số liên kết</p>
                      <p className="text-sm font-medium text-foreground">
                        {htmlContent ? (htmlContent.match(/<a [^>]*href=/g) || []).length : 0} liên kết
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Phần nội dung chính vẫn render từ HTML */}
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4 text-foreground">{title}</h1>
                <div
                  className="prose dark:prose-invert max-w-none article-content text-foreground"
                  dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
