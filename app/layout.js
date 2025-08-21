// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AI App Builder",
  description: "בנה אפליקציות עם בינה מלאכותית",
};

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <body className="bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
