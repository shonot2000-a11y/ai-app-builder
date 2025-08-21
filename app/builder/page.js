"use client";

import { useState } from "react";

export default function BuilderPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [appCode, setAppCode] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/buildApp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (data.code) {
        setAppCode(data.code);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "האפליקציה נבנתה 🎉" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "אירעה שגיאה בבנייה ❌" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "שגיאת שרת ❌" },
      ]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* עמודת הצ'אט */}
      <div className="w-1/3 border-r p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">💬 מחולל אפליקציות</h2>

        <div className="flex-1 overflow-y-auto border p-2 rounded mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.role === "user" ? "text-blue-600" : "text-green-600"
              }`}
            >
              <b>{msg.role === "user" ? "אתה:" : "בינה מלאכותית:"}</b>{" "}
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border px-2 py-1 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="תאר את האפליקציה שתרצה..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            צור קוד
          </button>
        </div>
      </div>

      {/* עמודת ה־iframe */}
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">📱 תצוגת אפליקציה</h2>
        <iframe
          className="w-full h-full border rounded"
          srcDoc={appCode}
          title="App Preview"
        />
      </div>
    </div>
  );
}
