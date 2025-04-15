import { Link } from "react-router-dom"; // nếu bạn đang dùng React Router

export default function EventSidebar({ slug, name }) {
  return (
    <div className="category-list p-4 border rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4 text-color-custom-1">Sự kiện khuyến mãi</h2>

      {slug && (
        <Link to={`/event/${slug}`} className="hover:underline block mt-2">
          {name}
        </Link>
      )}
    </div>
  );
}
