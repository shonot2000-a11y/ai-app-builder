"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">ברוך הבא ל־AI App Builder 🚀</h1>
      <p className="mb-8 text-lg">
        כאן תוכל לבנות אפליקציות באמצעות בינה מלאכותית – בלי לכתוב שורת קוד אחת!
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs mb-12">
        <button
          onClick={() => router.push("/builder")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 w-full"
        >
          ⚡ עבור למחולל אפליקציות
        </button>

        <button
          onClick={() => router.push("/generator")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 w-full"
        >
          🔮 עבור למחולל קוד
        </button>

        <button
          onClick={() => router.push("/admin/dashboard")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 w-full"
        >
          🛠️ עבור ללוח ניהול
        </button>

        <button
          onClick={() => router.push("/auth")}
          className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 w-full"
        >
          🔑 התחברות
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        🚪 התנתק
      </button>
    </div>
  );
}
