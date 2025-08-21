"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function ConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const confirmSession = async () => {
      // מוודא שהמשתמש מחובר
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("שגיאה באימות:", error.message);
        return;
      }

      if (session) {
        // אם המשתמש מחובר, נעביר אותו לדף הבית
        router.push("/home");
      }
    };

    confirmSession();
  }, [router]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>✅ האימייל אומת בהצלחה!</h1>
      <p>אתה מועבר לדף הבית...</p>
    </div>
  );
}
