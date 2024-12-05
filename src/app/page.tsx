import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="mb-4 text-2xl font-semibold">Welcome to Our Website</h1>
      <Link
        href="/login"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Đăng nhập
      </Link>
    </div>
  );
}
