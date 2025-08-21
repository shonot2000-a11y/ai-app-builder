"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // פונקציית הרשמה
  const signup = async () => {
    const { error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        // אחרי אימות מייל המשתמש יועבר לכתובת הזו
        emailRedirectTo: "http://localhost:3000/auth/confirm",
      }
    );

    if (error) {
      alert("שגיאה בהרשמה: " + error.message);
    } else {
      alert("נשלח אליך מייל לאימות. אנא בדוק את תיבת הדואר שלך.");
    }
  };

  // פונקציית התחברות
  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("שגיאה בהתחברות: " + error.message);
    } else {
      router.push("/home"); // מעבר לדף הבית אחרי התחברות מוצלחת
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>התחברות / הרשמה</h1>
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button onClick={signup} style={{ marginRight: "10px" }}>
        הרשמה
      </button>
      <button onClick={login}>התחברות</button>
    </div>
  );
}
