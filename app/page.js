"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // ✅ התיקון כאן

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        // אם המשתמש מחובר → שולחים אותו לדף הבית
        router.push("/home");
      } else {
        // אם המשתמש לא מחובר → שולחים לדף ההתחברות
        router.push("/auth");
      }
    };

    checkUser();
  }, [router]);

  return <div>טוען...</div>;
}
