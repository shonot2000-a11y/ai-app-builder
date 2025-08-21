"use client";

import { useState } from "react";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setCode(data.code);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">בנה אפליקציה עם AI 🚀</h1>

      <textarea
        className="border w-full p-3 rounded mb-4"
        rows={5}
        placeholder="תאר את האפליקציה שתרצה לבנות..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        disabled={loading}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? "יוצר קוד..." : "צור קוד"}
      </button>

      {code && (
        <pre className="bg-gray-900 text-green-400 p-4 mt-6 rounded overflow-x-auto">
          {code}
        </pre>
      )}
    </div>
  );
}
