"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6 shadow-lg">
      <Link href="/" className="hover:underline">🏠 בית</Link>
      <Link href="/auth" className="hover:underline">🔑 התחברות</Link>
      <Link href="/builder" className="hover:underline">⚡ מחולל אפליקציות</Link>
      <Link href="/admin/dashboard" className="hover:underline">🛠️ ניהול</Link>
    </nav>
  );
}
