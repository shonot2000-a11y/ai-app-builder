"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GeneratorPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    if (!prompt) {
      alert("אנא הכנס תיאור למחולל הקוד");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(data.result[0]?.generated_text || JSON.stringify(data.result));
    } catch (err) {
      setResult("שגיאה בשרת: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">מחולל קוד AI 🔮</h1>

      <textarea
        rows="4"
        placeholder="הכנס כאן תיאור של הקוד שאתה רוצה..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-lg p-3 border rounded mb-4"
      />

      <button
        onClick={generateCode}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        {loading ? "יוצר קוד..." : "צור קוד"}
      </button>

      <pre className="bg-gray-100 p-4 rounded mt-6 w-full max-w-2xl text-left overflow-x-auto">
        {result}
      </pre>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
      >
        ⬅️ חזרה לבית
      </button>
    </div>
  );
}
